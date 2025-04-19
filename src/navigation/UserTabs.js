import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserHome from '../screens/UserHome';
import Myinscriptions from '../screens/MyInscriptions';

const Tab = createBottomTabNavigator();

export default function UserTabs({navigation}) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Inicio" component={UserHome} />
      <Tab.Screen name ="Mis Inscripciones" component={Myinscriptions}/>
    </Tab.Navigator>
  );
}
