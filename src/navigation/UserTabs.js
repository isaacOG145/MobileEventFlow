// src/navigation/UserTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import UserHome from '../screens/UserHome';
import InscriptionsStack from './stacks/InscriptionStack';

const Tab = createBottomTabNavigator();

// Componente para la pantalla vacía del botón del drawer
function EmptyScreen() {
  return <View />;
}

export default function UserTabs({ navigation }) {
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
        component={UserHome} 
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
      <Tab.Screen 
        name="Mis Inscripciones" 
        component={InscriptionsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
            name="ticket"
            size={24}               // recibe el tamaño del tabBar (o usa 24 por defecto)
            color={focused ? '#8005A3' : '#666'} // igual lógica de color
          />
          ),
        }}
      />
      {/* Pantalla ficticia para el botón del drawer */}
      <Tab.Screen
        name="Menu"
        component={EmptyScreen}
        options={{
          tabBarButton: () => (
            <TouchableOpacity 
              onPress={() => navigation.toggleDrawer()}
              style={styles.drawerButton}
            >
              <Ionicons name="menu" size={28} color="#666" />
            </TouchableOpacity>
          ),
          tabBarLabel: () => null,
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
  drawerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});