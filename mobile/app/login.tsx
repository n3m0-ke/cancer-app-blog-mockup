// app/login.tsx
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('https://cancer-app-blog-mockup-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Login Failed', data.error || 'Check credentials');
        return;
      }

      // store token for later use (secure storage suggested in production)
      router.push('/');
    } catch (err) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput onChangeText={setEmail} value={email} autoCapitalize="none" style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Password</Text>
      <TextInput onChangeText={setPassword} value={password} secureTextEntry style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
