import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../screens/ProfileScreen';
import ChangePassword from '../../screens/ChangePassword';
import UpdateProfile from '../../screens/UpdateProfile';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyProfile" component={ProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />

    </Stack.Navigator>
  );
}
