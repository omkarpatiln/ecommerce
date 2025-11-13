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
import Toast from '../../Components/Toast';
import { apiPost } from '../../services';
type Props = StackAuthProps<'SignupScreen'>;

const SignupScreen:React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);

    const body = {
      email,
      username,
      password,
      name: { firstname: 'Test', lastname: 'User' },
      address: { city: 'NYC', street: 'somewhere', number: 3, zipcode: '12926' },
      phone: '123456789',
    };

    try {
      const response = await await apiPost("/users", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await response.data;
      setLoading(false);

      if (json.id) {
         Toast('Signup successful!');
        navigation.navigate('LoginScreen');
      } else {
         Alert.alert('Error creating account');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Signup error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account ✨</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.textGrey}
        value={email}
        onChangeText={setEmail}
      />

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

      

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <View >
        <Text style={styles.linkText}>
          Already have an account? <Text onPress={() => navigation.navigate('LoginScreen')} style={styles.link}>Login</Text>
        </Text>
      </View>
    </View>
  );
};

export default SignupScreen;
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
