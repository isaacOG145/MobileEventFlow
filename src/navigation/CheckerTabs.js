import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Platform } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import CheckerHome from '../screens/CheckerHome';

const Tab = createBottomTabNavigator();

export default function CheckerTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#8005A3',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={CheckerHome}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={focused ? '#8005A3' : '#666'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10, // espacio seguro para iOS
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
  },
});
