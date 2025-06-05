// app/index.tsx
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { Post } from '@/types';

import PostCard from '@/components/PostCard';

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://cancer-app-blog-mockup-backend.onrender.com/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#fff' }}>
      {/* Hero section */}
      <View style={{ marginBottom: 30 }}>
        {/* Replace this image URI with your hero image later */}
        <View style={{ backgroundColor: '#eef2f3', height: 180, borderRadius: 12, justifyContent: 'center', paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 6 }}>Welcome to Our Blog</Text>
          <Text style={{ fontSize: 16, color: '#555' }}>
            Discover inspiring stories and helpful resources
          </Text>
        </View>
      </View>

      {/* Posts Section */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Latest Posts</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : posts.length === 0 ? (
        <Text>No posts available.</Text>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </ScrollView>
  );
}