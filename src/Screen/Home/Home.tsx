import { View, Text, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import axios from 'axios';
import ItemlistRender from './ItemlistRender';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProduct,
  clearProductFromCart,
  removeProduct,
  selectCartTotalCount,
  setProducts,
} from '../../redux/productsSlice';
import { StackProps } from '../../Routes/routes';
import Header from '../../Components/Header';
import { RootState } from '../../redux/store';
import { removeCredentials } from '../../utils/keychain';
import { clearUser, setUserData } from '../../redux/userSlice';
import { apiGet, apiPost } from '../../services';

type Props = StackProps<'Home'>;

const Home: React.FC<Props> = ({ navigation }) => {
  const products = useSelector((state: RootState) => state.products.data);
  const totalCartCount = useSelector(selectCartTotalCount);
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await apiGet('/products');

    if (res.success && res.data) {
      dispatch(setProducts(res.data));
    } else {
      console.log('API fetch error:', res.error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Home"
        HeaderCount={totalCartCount}
        onCartClick={() => {
          navigation.navigate('CartScreen');
        }}
        onLogoutPress={() => {
          removeCredentials();
          dispatch(clearUser());
        }}
      />

      <View style={{ flex: 1, marginHorizontal: 15 }}>
        <FlatList
          data={products}
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

export default Home;
