// app/posts/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, ActivityIndicator } from 'react-native';
import { Post } from '@/types';

export default function PostDetails() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`https://cancer-app-blog-mockup-backend.onrender.com/api/posts/${id}`)
        .then(res => res.json())
        .then(data => setPost(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!post) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Post not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: '#fff' }} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header Image Placeholder */}
      <Image
        source={require('@/static/default_blog_image.jpg')} // Replace with real image URL later
        style={{ width: '100%', height: 200, resizeMode: 'cover' }}
      />

      {/* Content */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 6 }}>
          {post.title}
        </Text>
        <Text style={{ fontSize: 14, color: '#888', marginBottom: 16 }}>
          Published on {new Date(post.published_at).toLocaleDateString()}
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 24 }}>{post.content}</Text>
      </View>
    </ScrollView>
  );
}