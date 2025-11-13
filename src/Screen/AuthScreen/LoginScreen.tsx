import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { colors, fontWeights, sizes, textStyles } from '../../theme/themStyles';
import { StackAuthProps } from '../../Routes/AuthNavigator';
import { saveCredentials } from '../../utils/keychain';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/userSlice';
import Toast from '../../Components/Toast';
import { apiGet, apiPost } from '../../services';
type Props = StackAuthProps<'LoginScreen'>;

const LoginScreen:React.FC<Props> = ({ navigation,route }) => {
  const [username, setUsername] = useState('mor_2314');
  const [password, setPassword] = useState('83r5^_');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()
const handleLogin = async () => {
  try {
    
    if (!username.trim()) {
      Alert.alert("Validation Error", "Username is required");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Validation Error", "Password is required");
      return;
    }

    setLoading(true);

   
    const loginRes = await apiPost("/auth/login", {
      username,
      password,
    });

    if (!loginRes.success || !loginRes.data?.token) {
      setLoading(false);
      Alert.alert("Invalid Credentials", "Please check username or password");
      return;
    }

    const token = loginRes.data.token;

   
    const usersRes = await apiGet("/users");

    if (!usersRes.success || !usersRes.data) {
      setLoading(false);
      Alert.alert("Error", "Unable to fetch user details");
      return;
    }

    const allUsers = usersRes.data;

   
    const matchedUser = allUsers.find(
      (u: any) => u.username === username.trim()
    );

    if (!matchedUser) {
      setLoading(false);
      Alert.alert("Error", "User profile not found");
      return;
    }

   
    await saveCredentials(token, matchedUser);


    dispatch(
      setUserData({
        token,
        user: matchedUser,
      })
    );

    Toast("Login Successful!");

    setLoading(false);

  } catch (err) {
    setLoading(false);
    console.log("Login Error:", err);
    Alert.alert("Login Failed", "Something went wrong. Try again.");
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back 👋</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={colors.textGrey}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.textGrey}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <View  >
        <Text style={styles.linkText}>
          Don’t have an account? <Text onPress={() => navigation.navigate('SignupScreen')} style={styles.link}>Sign up</Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: sizes.paddingL,
    justifyContent: 'center',
  },

  title: {
    ...textStyles.headingXL,
    textAlign: 'center',
    color: colors.primary,
  },

  subtitle: {
    ...textStyles.body,
    textAlign: 'center',
    marginBottom: sizes.marginL,
    color: colors.textGrey,
  },

  input: {
    width: '100%',
    padding: sizes.paddingM,
    borderRadius: sizes.Radius,
    backgroundColor: colors.white,
    marginBottom: sizes.marginM,
    borderWidth: 1,
    borderColor: colors.borderLight,
    fontSize: sizes.fontM,
    color: colors.black,
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: sizes.paddingM,
    borderRadius: sizes.Radius,
    alignItems: 'center',
    marginTop: sizes.marginS,
    elevation: 5,
  },

  buttonText: {
    ...textStyles.buttonText,
  },

  linkText: {
    textAlign: 'center',
    marginTop: sizes.marginM,
    color: colors.textPrimary,
    fontSize: sizes.fontS,
  },

  link: {
    color: colors.primary,
    fontWeight: fontWeights.semiBold,
  },
});

