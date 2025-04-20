import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, Entypo } from '@expo/vector-icons';
import InscriptionsStack from './stacks/InscriptionStack';
import UserHomeStack from './stacks/UserHomeStack';
import { StyleSheet, Platform, TouchableOpacity } from 'react-native';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
        component={UserHomeStack} 
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
              size={24}
              color={focused ? '#8005A3' : '#666'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen} // Aquí mantenemos el stack de perfil
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