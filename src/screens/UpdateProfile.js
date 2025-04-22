import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import CustomHeader from '../components/CustomHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors, Spacing, fontSizes } from "../config/Styles";
import InputComponent from "../components/InputComponent";
import BlueButton from "../components/BlueButton";
import PurpleButton from "../components/PurpleButton";
import { useNavigation } from '@react-navigation/native';
import { getUserProfile, getUserInfo, updateUserProfile } from '../config/Api';
import MessageModal from '../components/MessageModal';

const cellphoneImg = require('../../assets/icons/telefono-inteligente.png');

export default function UpdateProfile() {
    const [cellphone, setCellphone] = useState("");
    const [cellphoneError, setCellphoneError] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState('success');
    const [showNotification, setShowNotification] = useState(false);
    const navigation = useNavigation();

    const fetchUserData = async () => {
        try {
            const user = await getUserProfile();
            const profile = await getUserInfo(user.userId);
            
            if (profile && profile.result.phone) {
                setCellphone(profile.result.phone);
            }
        } catch (error) {
            console.error("Error al cargar el perfil del usuario:", error);
        }
    };

    const updateUser = async () => {
        setCellphoneError("");

        let valid = true;


        if (cellphone.length !== 10) {
            setCellphoneError("El teléfono debe tener 10 caracteres");
            valid = false;
        } else if (!/^\d+$/.test(cellphone)) {
            setCellphoneError("El teléfono solo debe contener números");
            valid = false;
        }


        if (!valid) return;
        try {

            showMessage('loading', 'Actualizando perfil');
            const user = await getUserProfile();
            const response = await updateUserProfile(user.userId, cellphone);

            if(response.type === "SUCCESS"){
                setTimeout(() => {
                showMessage('success', '¡Usuario actualizado correctamente!');
                setShowNotification(true);
                
            }, 1500);
            
            
            }

        } catch (error) {
            if (error.response) {
                const { text, type } = error.response.data;
                showMessage(type.toLowerCase(), text);
            } else {
                showMessage('error', error.message);
            }
        }
    }
    useEffect(() => {
        fetchUserData();
    }, []);


    const validateField = (field, value) => {
        if (!value.trim()) {
            setErrors(prev => ({ ...prev, [field]: 'Este campo es requerido' }));
            return false;
        }
        setErrors(prev => ({ ...prev, [field]: '' }));
        return true;
    };

    const showMessage = (type, message) => {
        setModalType(type);
        setModalMessage(message);
        setShowNotification(true);
    };

    return (
        <View style={styles.container}>
            <CustomHeader />
            <ScrollView
                contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <Text style={styles.title}>Actualizar perfil</Text>
                    <View style={styles.spacing}>
                        <InputComponent
                            value={cellphone}
                            onChangeText={(text) => {
                                setCellphone(text);
                                validateField('cellphone', text);
                            }}
                            error={cellphoneError}
                            label="Telefono"
                            required={true}
                            imageSource={cellphoneImg}
                            imageStyle={{ width: 20, height: 20 }}
                        />
                    </View>

                    <View style={styles.spacing}>
                        <BlueButton onPress={updateUser}>Confirmar</BlueButton>
                    </View>
                    <PurpleButton onPress={() => navigation.goBack()}>Cancelar</PurpleButton>
                </View>
            </ScrollView>
            <MessageModal
                show={showNotification}
                message={modalMessage}
                onClose={() => setShowNotification(false)}
                type={modalType}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
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
    }, spacing: {
        marginBottom: Spacing.margin.medium,
    },
});