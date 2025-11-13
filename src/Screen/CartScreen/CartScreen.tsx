import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  addProduct,
  clearProductFromCart,
  removeProduct,
} from '../../redux/productsSlice';
import ItemlistRender from '../Home/ItemlistRender';
import Header from '../../Components/Header';
import { StackProps } from '../../Routes/routes';
import axios from 'axios';
import { RootState } from '../../redux/store';
import { apiPost } from '../../services';

type Props = StackProps<'CartScreen'>;

const CartScreen: React.FC<Props> = ({ navigation, route }) => {
  const products = useSelector((state: RootState) => state.products.data);
  const user = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch();
  const updateCart = async (productId: number, quantity: number) => {
    const userId = user?.id;
    const body = {
      userId,
      date: new Date(),
      products: [{ productId, quantity }],
    };

    const res = await apiPost('/carts', body);

    return res.success; // true or false
  };

  const removeFromCart = async (productId: number) => {
    const userId = user?.id;

    const body = {
      userId,
      date: new Date(),
      products: [{ productId, quantity: 0 }],
    };

    const res = await apiPost('/carts', body);

    return res.success;
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        onBackPress={() => {
          navigation.goBack();
        }}
        title="Cart Screen"
      />
      <View style={{ flex: 1, marginHorizontal: 15 }}>
        <FlatList
          data={products.filter(item => (item.cartCount ?? 0) > 0)}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ItemlistRender
              onRemoveCart={async () => {
                const res = await removeFromCart(item.id);
                if (res) {
                  dispatch(clearProductFromCart(item.id));
                  return true;
                }
                return false;
              }}
              item={item}
              onAddCart={async count => {
                const success = await updateCart(item.id, count);
                if (success) {
                  dispatch(addProduct({ ...item, cartCount: count }));
                }
              }}
              onLessCart={async count => {
                const success = await updateCart(item.id, count);
                if (success) {
                  dispatch(removeProduct(item.id));
                }
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

export default CartScreen