import * as SecureStore from 'expo-secure-store';

export async function saveAuth(token: string, user: any) {
  await SecureStore.setItemAsync('token', token);
  await SecureStore.setItemAsync('user', JSON.stringify(user));
}

export async function getAuth() {
  const token = await SecureStore.getItemAsync('token');
  const userRaw = await SecureStore.getItemAsync('user');
  const user = userRaw ? JSON.parse(userRaw) : null;
  return { token, user };
}

export async function logout() {
  await SecureStore.deleteItemAsync('token');
  await SecureStore.deleteItemAsync('user');
}
