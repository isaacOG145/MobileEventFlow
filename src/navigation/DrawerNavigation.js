import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons, FontAwesome5, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import UserTabs from './UserTabs';
import ProfileScreen from '../screens/ProfileScreen';
import UpdateProfile from '../screens/UpdateProfile';
import ChangePassword from '../screens/ChangePassword';
import { Colors } from '../config/Styles';

const userFrame = require('../../assets/icons/userFrame.png');
const Drawer = createDrawerNavigator();

export default function UserDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        drawerStyle: {
          width: '70%',
          backgroundColor:Colors.background, // Color de fondo para todo el Drawer
        },
        drawerActiveTintColor: Colors.purple, // Color del texto y el icono cuando está activo
        drawerInactiveTintColor: '#333', // Color del texto y el icono cuando está inactivo
        drawerActiveBackgroundColor: Colors.background, // Color de fondo cuando el item está presionado
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={UserTabs}
        options={{
          title: 'Inicio',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Editar perfil"
        component={UpdateProfile}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="user-edit" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Cambiar contraseña"
        component={ChangePassword}
        options={{
          drawerIcon: ({ color, size }) => (
            <Entypo name="lock" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flexGrow: 1, paddingTop: 0, margin: 0 }}
      style={styles.scrollView}
    >
      {/* Encabezado personalizado */}
      <View style={styles.headerContainer}>
        <Image source={userFrame} style={styles.userImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Nombre del Usuario</Text>
          <Text style={styles.userEmail}>correo@ejemplo.com</Text>
        </View>
      </View>

      {/* Items del drawer */}
      <View style={styles.drawerItemsContainer}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Cerrar sesión"
          labelStyle={{ color: '#333' }} // Color del texto para "Cerrar sesión"
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="logout" size={size} color={color} />
          )}
          onPress={() => {
            // Aquí puedes agregar la lógica para abrir el modal de confirmación
            alert('Cerrar sesión');
          }}
          
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', // Asegura que el encabezado cubra todo el ancho
  },
  userImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 12,
  },
  userInfo: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.violet, // Color de texto para el nombre del usuario
  },
  userEmail: {
    fontSize: 14,
    color: Colors.violet, // Color de texto para el correo del usuario
  },
  drawerItemsContainer: {
    flex: 1,
    paddingTop: 10,
    width: '100%', // Asegura que el contenedor de items cubra todo el ancho
  },
});
