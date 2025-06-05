import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Post } from '@/types';

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/post/${post.id}`)}
      style={{
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>{post.title}</Text>
      <Text style={{ fontSize: 13, color: '#777', marginBottom: 8 }}>
        Published on {new Date(post.published_at).toLocaleDateString()}
      </Text>
      <Text numberOfLines={3} style={{ fontSize: 15, color: '#444' }}>
        {post.content.length > 200
          ? `${post.content.substring(0, 200)}...`
          : post.content}
      </Text>
      <Text style={{ color: '#2563eb', marginTop: 8, fontWeight: '500' }}>
        Read more →
      </Text>
    </TouchableOpacity>
  );
}
