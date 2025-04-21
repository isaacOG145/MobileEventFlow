import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import CheckerHomeStack from './stacks/CheckerHomeStack';
import AssignmentStack from './stacks/AssignmentStack';
import ProfileStack from './stacks/ProfileStack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function CheckerTabs({ navigation }) {

  function EmptyScreen() {
    return <View />;
  }
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
        component={CheckerHomeStack}
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
        name="Asignaciones"
        component={AssignmentStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="ticket"
              size={24}
              color={focused ? '#8005A3' : '#666'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={focused ? '#8005A3' : '#666'}
            />
          ),
        }}
      />
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