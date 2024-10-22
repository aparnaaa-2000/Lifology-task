import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserListScreen from '../screens/UserListScreen';
import UserPostsScreen from '../screens/UserPostsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="UserList">
      <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'Users' }} />
      <Stack.Screen name="UserPosts" component={UserPostsScreen} options={{ title: 'User Posts' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
