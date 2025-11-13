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

type Props = StackProps<'Home'>;

const Home: React.FC<Props> = ({ navigation }) => {
  const products = useSelector((state: RootState) => state.products.data);
  const totalCartCount = useSelector(selectCartTotalCount);
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      if (response && response.data) {
        dispatch(setProducts(response.data));
      }
    } catch (error) {
      console.error('API fetch error:', error);
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
