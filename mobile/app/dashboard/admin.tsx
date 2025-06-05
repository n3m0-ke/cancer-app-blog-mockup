import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { getAuth, logout } from '@/utils/auth';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { token, user } = await getAuth();
      if (!token || user.role !== 'admin') {
        return router.replace('/');
      }
      setUser(user);

      try {
        const res = await axios.get(
          `https://cancer-app-blog-mockup-backend.onrender.com/api/admin/dashboard`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStats(res.data);
      } catch (err) {
        console.log('Error loading stats:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold mb-4">Admin Dashboard</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text className="text-lg mb-2">Welcome, {user?.name}</Text>
          <Text className="mb-4 text-gray-600">{user?.email}</Text>
          <View className="mb-6">
            <Text>Total Users: {stats?.totalUsers}</Text>
            <Text>Total Posts: {stats?.totalPosts}</Text>
            <Text>Total Comments: {stats?.totalComments}</Text>
          </View>

          <TouchableOpacity onPress={() => router.replace('/')} className="mb-4">
            <Text className="text-blue-600 underline">Go to Blog</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} className="bg-red-500 p-3 rounded">
            <Text className="text-white text-center">Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
