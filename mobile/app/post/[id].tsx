// app/post/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { Post } from '@/types';

export default function PostScreen() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`https://cancer-app-blog-mockup-backend.onrender.com/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!post) return <Text>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>{post.title}</Text>
      <Text style={{ fontSize: 16 }}>{post.content}</Text>
    </ScrollView>
  );
}
