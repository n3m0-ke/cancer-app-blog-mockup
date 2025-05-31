// app/index.tsx
import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { router } from 'expo-router';

import { Post } from '@/types';

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('https://cancer-app-blog-mockup-backend.onrender.com/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Blog Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/post/${item.id}`)}>
            <Text style={{ fontSize: 18, marginVertical: 5 }}>{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
