import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { saveAuth } from '@/utils/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Please enter email and password.');
    }

    setLoading(true);
    try {
      const res = await axios.post('https://cancer-app-blog-mockup-backend.onrender.com/api/auth/login', {
        email,
        password,
      });

      const { token, user } = res.data;
      await saveAuth(token, user);

      // Role-based redirect
      switch (user.role) {
        case 'admin':
          router.replace('/dashboard/admin');
          break;
        case 'author':
          router.replace('/dashboard/author');
          break;
        default:
          router.replace('/');
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Login Failed', 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold mb-6 text-center">Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border rounded px-4 py-2 mb-4"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border rounded px-4 py-2 mb-6"
      />

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        className={`bg-blue-600 py-3 rounded ${loading ? 'opacity-50' : ''}`}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center font-semibold">Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
