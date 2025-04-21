import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CheckerTabs from './CheckerTabs';
import Logout from '../modals/Logout';
const { height, width } = Dimensions.get('window');
import { Colors, ModalStyles } from '../config/Styles';
import { getUserInfo } from '../config/Api';
import { AuthContext } from '../context/AuthContext';

const userFrame = require('../../assets/icons/userFrame.png');
const Drawer = createDrawerNavigator();

export default function CheckerDrawer() {
    const [userData, setUserData] = useState({ name: '', email: '' });
    const [showModal, setShowModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const { user, logout } = useContext(AuthContext);

    const loadProfile = async () => {
        try {
            const userInfo = await getUserInfo(user.userId);
            setUserData({
                name: userInfo.result.name,
                email: userInfo.result.email,
            });
        } catch (error) {
            console.error('Error cargando el perfil:', error.message);
        }
    };

    useEffect(() => {
        if (user) {
            loadProfile();
        }
    }, [user]);

    const handleLogout = async () => {
        setIsProcessing(true);
        try {
            await logout();
            setIsProcessing(false);
            setShowModal(false);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            setIsProcessing(false);
        }
    };

    return (
        <Drawer.Navigator
            drawerContent={(props) => (
                <CustomDrawerContent 
                    {...props} 
                    userData={userData} 
                    showModal={showModal}
                    setShowModal={setShowModal}
                    isProcessing={isProcessing}
                    logout={handleLogout}
                />
            )}
            screenOptions={{
                drawerPosition: 'right',
                headerShown: false,
                drawerStyle: {
                    width: '90%',
                    backgroundColor: Colors.background,
                },
                drawerActiveTintColor: Colors.purple,
                drawerInactiveTintColor: '#333',
                drawerActiveBackgroundColor: Colors.background,
            }}
        >
            <Drawer.Screen
                name="CheckerTabs"
                component={CheckerTabs}
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
    const { 
        userData, 
        showModal, 
        setShowModal, 
        isProcessing, 
        logout 
    } = props;

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
                    onPress={() => setShowModal(true)}
                />
            </View>
            
            
            {showModal && (
                <View style={[ModalStyles.overlay, styles.cover]}>
                    <TouchableOpacity
                        style={ModalStyles.overlayTouchable}
                        activeOpacity={1}
                        onPress={() => !isProcessing && setShowModal(false)}
                    />

                    <View style={[ModalStyles.container, {
                        maxHeight: height * 0.7,
                        width: width * 0.8
                    }]}>
                        <View style={ModalStyles.content}>
                            <Logout
                                onCancel={() => !isProcessing && setShowModal(false)}
                                onConfirm={logout}
                                isProcessing={isProcessing}
                            />
                        </View>
                    </View>
                </View>
            )}
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
    cover: {
        ...StyleSheet.absoluteFillObject,
    }
});