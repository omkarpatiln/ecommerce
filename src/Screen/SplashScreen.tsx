import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { StackProps } from '../Routes/routes';
import { getCredentials } from '../utils/keychain';
import { setUserData } from '../redux/userSlice';
import { StackAuthProps } from '../Routes/AuthNavigator';
import { colors } from '../theme/themStyles';


type Props = StackAuthProps<'SplashScreen'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
 const init = async () => {
      try {
        const savedData = await getCredentials();
        console.log("savedData",savedData)

        if (savedData && savedData.token) {
          dispatch(
            setUserData({
              token: savedData.token,
              user: savedData.user,
            })
          );

        } else {
        navigation.replace('LoginScreen');
        }
      } catch (err) {
        console.log('Splash error:', err);
        navigation.replace('LoginScreen');
      }
    };
  useEffect(() => {
   

    setTimeout(init, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
