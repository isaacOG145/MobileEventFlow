import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import UserTabs from './UserTabs';
import { Colors } from '../config/Styles';
import { getUserProfile, getUserInfo } from '../config/Api';

const userFrame = require('../../assets/icons/userFrame.png');
const Drawer = createDrawerNavigator();

export default function UserDrawer() {
    const [userData, setUserData] = useState({ name: '', email: '' });

    const loadProfile = async () => {
        try {
            const profile = await getUserProfile();
            const userInfo = await getUserInfo(profile.userId);
            setUserData({
                name: userInfo.result.name,
                email: userInfo.result.email,
            });
        } catch (error) {
            console.error('Error cargando el perfil:', error.message);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} userData={userData} />}
            screenOptions={{
                drawerPosition: 'right',
                headerShown: false,
                drawerStyle: {
                    width: '70%',
                    backgroundColor: Colors.background,
                },
                drawerActiveTintColor: Colors.purple,
                drawerInactiveTintColor: '#333',
                drawerActiveBackgroundColor: Colors.background,
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
        </Drawer.Navigator>
    );
}

const CustomDrawerContent = (props) => {
    const { userData, navigation } = props;

    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ flexGrow: 1, paddingTop: 0, margin: 0 }}
            style={styles.scrollView}
        >
            <View style={styles.headerContainer}>
                <Image source={userFrame} style={styles.userImage} />
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>
                        {userData.name || 'Nombre del Usuario'}
                    </Text>
                    <Text style={styles.userEmail}>
                        {userData.email || 'correo@ejemplo.com'}
                    </Text>
                </View>
            </View>

            <View style={styles.drawerItemsContainer}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Cerrar sesión"
                    labelStyle={{ color: '#333' }}
                    icon={({ color, size }) => (
                        <MaterialCommunityIcons name="logout" size={size} color={color} />
                    )}
                    onPress={() => {
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
        width: '100%',
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
        color: Colors.violet,
    },
    userEmail: {
        fontSize: 14,
        color: Colors.violet,
    },
    drawerItemsContainer: {
        flex: 1,
        paddingTop: 10,
        width: '100%',
    },
});
