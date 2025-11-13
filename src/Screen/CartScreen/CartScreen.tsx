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

type Props = StackProps<'CartScreen'>;

const CartScreen: React.FC<Props> = ({ navigation, route }) => {
  const products = useSelector((state: RootState) => state.products.data);
  const user = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch();
  const updateCart = async (productId: number, quantity: number) => {
    try {
      const response = await axios.post('https://fakestoreapi.com/carts', {
        userId: user?.id,
        date: new Date(),
        products: [{ productId, quantity }],
      });

      return response.status === 200 || response.status === 201;
    } catch (error) {
      console.log('Update Cart API Error:', error);
      return false;
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      const response = await axios.post('https://fakestoreapi.com/carts', {
        userId: user?.id,
        date: new Date(),
        products: [{ productId, quantity: 0 }],
      });

      return response.status === 200 || response.status === 201;
    } catch (error) {
      console.log('Remove Cart API Error:', error);
      return false;
    }
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
                }
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