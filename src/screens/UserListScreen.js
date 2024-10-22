
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { FlatList, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { userStore } from '../models/UserStore'; // Using shared store

const UserListScreen = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    userStore.fetchUsers(); // Fetch users on component mount
  }, []);

  const loadMoreUsers = () => {
    if (!userStore.isLoading) {
      userStore.fetchUsers(); // Add pagination logic here if needed
    }
  };

  if (userStore.isLoading && userStore.users.length === 0) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('UserPosts', { userId: item.id })}>
      <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ccc' }}>
        <Text style={{ fontSize: 18 }}>{item.name}</Text>
        <Text style={{ color: 'gray' }}>{item.email}</Text>
        
        <Text>{item.company.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={userStore.users.slice()}  // Convert MobX observable array to plain array
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadMoreUsers}    // Infinite scrolling trigger
      onEndReachedThreshold={0.5}     // Trigger when 50% from the bottom
      ListFooterComponent={userStore.isLoading ? <ActivityIndicator size="small" /> : null}
    />
  );
});

export default UserListScreen;