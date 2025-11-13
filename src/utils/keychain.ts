import * as Keychain from 'react-native-keychain';

export const saveCredentials = async (token: string, user: any) => {
  await Keychain.setGenericPassword('auth', JSON.stringify({ token, user }));
};

export const getCredentials = async () => {
  const creds = await Keychain.getGenericPassword();
  if (creds) return JSON.parse(creds.password);
  return null;
};

export const removeCredentials = async () => {
  await Keychain.resetGenericPassword();
};
