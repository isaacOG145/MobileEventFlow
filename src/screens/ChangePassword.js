import React from "react";
import { StyleSheet, View, Text } from "react-native";
import CustomHeader from '../components/CustomHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors, Spacing, ModalStyles, fontSizes } from "../config/Styles";
import PasswordInput from '../components/PasswordInput';
import BlueButton from "../components/BlueButton";
import PurpleButton from "../components/PurpleButton";
import { useState } from "react";
import { getUserProfile, updatePassword } from "../config/Api";
import MessageModal from '../components/MessageModal';
import { useNavigation } from '@react-navigation/native';

const passwordImg = require('../../assets/icons/llave.png');

export default function ChangePassword() {
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [rePasswordError, setRePasswordError] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState('success');
    const [showNotification, setShowNotification] = useState(false);
    const navigation = useNavigation();

    const showMessage = (type, message) => {
        setModalType(type);
        setModalMessage(message);
        setShowNotification(true);
    };


    const handleUpdate = async () => {

        setPasswordError("");
        setRePasswordError("");

        let valid = true;

        // Validar longitud de contraseña
        if (password.length < 8) {
            setPasswordError("La contraseña debe tener al menos 8 caracteres");
            valid = false;
        }

        // Validar que ambas contraseñas coincidan
        if (password !== rePassword) {
            setRePasswordError("Las contraseñas no coinciden");
            valid = false;
        }

        if (!valid) return;

        try {
            showMessage('loading', 'Cambiando contraseña');
            const user = await getUserProfile();
            const response = await updatePassword(user.userId, password );

            setTimeout(() => {
                showMessage('success', '¡Contraseña cambiada exitosamente!');
                setShowNotification(true);
            }, 1500);

        } catch (error) {
            if (error.response) {
                const { text, type } = error.response.data;
                showMessage(type.toLowerCase(), text);
            } else {
                showMessage('error', error.message);
            }
        }
    };


    return (
        <View style={styles.container}>
            <CustomHeader />
            <ScrollView
                contentContainerStyle={styles.scrollContent}>

                <View style={styles.card}>
                    <Text style={styles.title}>Cambiar contraseña</Text>

                    <PasswordInput
                        value={password}
                        onChangeText={setPassword}
                        error={passwordError}
                        label="Ingresar contraseña"
                        required={true}
                        imageSource={passwordImg}
                        imageStyle={{ width: 24, height: 24 }}
                    />
                    <PasswordInput
                        value={rePassword}
                        onChangeText={setRePassword}
                        error={rePasswordError}
                        label="Repetir contraseña"
                        required={true}
                        imageSource={passwordImg}
                        imageStyle={{ width: 24, height: 24 }}
                    />
                    <View style={styles.buttonSpacing}>
                        <BlueButton onPress={handleUpdate}>Confirmar</BlueButton>
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
    }, buttonSpacing: {
        marginBottom: Spacing.margin.medium,
    },
});