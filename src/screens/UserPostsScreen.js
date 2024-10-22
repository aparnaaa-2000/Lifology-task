// src/screens/UserPostsScreen.js
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

const UserPostsScreen = ({ route }) => {
  const { userId } = route.params;
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://dummyjson.com/users/${userId}/posts?page=${page}`);
      setPosts([...posts, ...response.data.posts]); 
      setPage(page + 1);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts when the screen loads
  }, []);

  const loadMorePosts = () => {
    if (!isLoading) {
      fetchPosts(); // Load more posts when the user reaches the bottom
    }
  };

  if (isLoading && posts.length === 0) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderItem = ({ item }) => (
    <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ccc' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
      <Text>{item.body}</Text>
    </View>
  );
  
  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.id}-${index}`}  // Ensure unique key
      onEndReached={loadMorePosts}   // Infinite scrolling trigger
      onEndReachedThreshold={0.5}    // Trigger when 50% from the bottom
      ListFooterComponent={isLoading ? <ActivityIndicator size="small" /> : null}
    />
  );
  
};

export default UserPostsScreen;
