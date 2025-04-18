import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CheckerHome from '../screens/CheckerHome';

const Tab = createBottomTabNavigator();

export default function CheckerTabs({navigation}) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="InicioChecker" component={CheckerHome} />
    </Tab.Navigator>
  );
}
