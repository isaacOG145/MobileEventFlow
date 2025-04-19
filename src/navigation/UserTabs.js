import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserHome from '../screens/UserHome';
import InscriptionsStack from './stacks/InscriptionStack';

const Tab = createBottomTabNavigator();

export default function UserTabs({navigation}) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Inicio" component={UserHome} />
      <Tab.Screen name ="Mis Inscripciones" component={InscriptionsStack}/>
    </Tab.Navigator>
  );
}
