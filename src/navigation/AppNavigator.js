import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import LoadingScreen from '../screens/LoadingScreen';
import UserDrawer from './DrawerNavigation';
import UserTabs from './UserTabs';
import CheckerTabs from './CheckerTabs';
import AdminScreen from '../screens/AdminScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : role == 'USER' ? (
          
          <Stack.Screen name="UserDrawer" component={UserDrawer} />
        ) : role == 'CHECKER' ? (
          <Stack.Screen name="CheckerTabs" component={CheckerTabs} />
        ) : (
          // Pantalla por defecto o de error si el rol no es reconocido
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
        
        <Stack.Screen name="adminScreen" component={AdminScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
