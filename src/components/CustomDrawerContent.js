import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const userFrame = require('../../assets/icons/userFrame.png');

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 0 }}
      style={styles.scrollView}
    >
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <Image source={userFrame} style={styles.userImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Nombre del Usuario</Text>
          <Text style={styles.userEmail}>correo@ejemplo.com</Text>
        </View>
      </View>

      {/* ITEMS */}
      <View style={styles.drawerItemsContainer}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 0,
    margin: 0,
  },
  headerContainer: {
    backgroundColor: '#d63031',
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 0, // aseguramos que no haya espacio arriba
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
    color: 'white',
  },
  userEmail: {
    fontSize: 14,
    color: 'white',
  },
  drawerItemsContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 10,
  },
});

export default CustomDrawerContent;
