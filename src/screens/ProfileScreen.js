import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Colors, fontSizes, ModalStyles, Spacing } from '../config/Styles';
import CustomHeader from '../components/CustomHeader';
import { ScrollView } from 'react-native-gesture-handler';
import BlueButton from "../components/BlueButton";
import PurpleButton from '../components/PurpleButton';
import { useNavigation } from '@react-navigation/native';
import { getUserProfile, getUserInfo } from "../config/Api";
import { formatDate } from "../utils/DateUtils";

export default function ProfileScreen() {
    const navigation = useNavigation();
    const [userData, setUserData] = useState({
        name: '',
        lastName: '',
        cellphone: '',
        birthday: '',
        email: '',
        address: '',
        job: '',
        workplace: '',
        howFound: ''
    });



    const loadProfile = async () => {
        try {
            const user = await getUserProfile();
            const userInfo = await getUserInfo(user.userId);
            const profile = userInfo.result;
            setUserData({
                name: profile?.name || '',
                lastName: profile?.lastName || '',
                email: profile?.email || '',
                cellphone: profile?.phone || '',
                birthday: profile?.birthday || '',
                address: profile?.address || '',
                job: profile?.job || '',
                workplace: profile?.workplace || ''
            });

        } catch (error) {
            console.error('Error cargando el perfil:', error.message);
        }
    };

    useEffect(() => {

        loadProfile();

    }, []);

    const handleEdit = () => {
        navigation.navigate('UpdateProfile')
    }
    const handleChangePassword = () => {
        navigation.navigate('ChangePassword')
    }

    const renderField = (label, value) => {
        if (!value) return null;
        return (
            <>
                <Text style={styles.boldText}>{label}</Text>
                <Text style={styles.text}>{value}</Text>
            </>
        );
    };

    function calculateAge(birthdateStr) {
        const today = new Date();
        const birthdate = new Date(birthdateStr);
        let age = today.getFullYear() - birthdate.getFullYear();
        const month = today.getMonth() - birthdate.getMonth();
    
        // Ajuste si el cumpleaños aún no ha ocurrido este año
        if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }
    
        return age;
    }
    
    return (
        <View style={styles.container}>
            <CustomHeader />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
            >

                <View style={styles.card}>
                    <Text style={styles.title}>Perfil</Text>

                    <Text style={styles.boldText}>Nombre</Text>
                    <Text style={styles.text}>{userData.name} {userData.lastName}</Text>
                    <Text style={styles.boldText}>Email</Text>
                    <Text style={styles.text}>{userData.email}</Text>
                    <Text style={styles.boldText}>Télefono</Text>
                    <Text style={styles.text}>{userData.cellphone}</Text>
                    {renderField("Fecha de nacimiento", calculateAge(userData.birthday))}
                    {renderField("Dirección", userData.address)}
                    {renderField("Profesión", userData.job)}
                    {renderField("Lugar de trabajo", userData.workplace)}
                    {renderField("¿Cómo nos conociste?", userData.howFound)}

                    <View style={styles.buttonSpacing}>
                        <BlueButton onPress={handleEdit}>Editar perfil</BlueButton>
                    </View>

                    <PurpleButton onPress={handleChangePassword}>Cambiar contraseña</PurpleButton>

                </View>

            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    boldText: {
        fontSize: fontSizes.normal,
        color: Colors.textDark,
        textAlign: 'left',
        fontWeight: '600'
    },
    text: {
        fontSize: fontSizes.normal,
        marginBottom: Spacing.margin.small,
        color: Colors.textDark,
        textAlign: 'justify',
        fontWeight: '500'
    },
    scrollContent: {
        paddingHorizontal: Spacing.padding.medium,
        paddingTop: 10,
        paddingBottom: 30,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
        paddingHorizontal: 16,
        color: Colors.blue,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    cover: {
        ...StyleSheet.absoluteFillObject,
    },
    card: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 12,
        marginTop: Spacing.margin.large,
        padding: Spacing.padding.xxlarge,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }, buttonSpacing: {
        marginBottom: Spacing.margin.medium,
        marginTop: Spacing.margin.medium
    },
});