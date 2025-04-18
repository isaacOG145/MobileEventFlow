import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserHome from '../screens/UserHome';

const Tab = createBottomTabNavigator();

export default function UserTabs({navigation}) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="InicioUsuario" component={UserHome} />
      {/* Tab.Screen name="Perfil" ... */}
    </Tab.Navigator>
  );
}
