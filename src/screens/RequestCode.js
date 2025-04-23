import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, KeyboardAvoidingView, Platform } from 'react-native'
import { Spacing, Colors, fontSizes } from "../config/Styles";
import MessageModal from "../components/MessageModal";
import InputComponent from "../components/InputComponent";
import BlueButton from "../components/BlueButton";

const loginLogo = require('../../assets/logo/loginLogo.png');
const userImg = require('../../assets/icons/user.png');

export default function RequestCode() {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('success');
    const [modalMessage, setModalMessage] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const showMessage = (type, message) => {
        setModalType(type);
        setModalMessage(message);
        setShowModal(true);
    };

    const handleSend = () => {

    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ImageBackground
                source={require('../../assets/background/background.png')}
                style={styles.backgroundImage}
                resizeMode="stretch"
            >
                <View style={styles.contentLogo}>
                    <Image
                        source={loginLogo}
                        style={styles.loginLogo}
                    />
                </View>

                <View style={styles.content}>

                    <View style={styles.card}>
                        <Text style={styles.title}>Recuperar contraseña</Text>

                        <InputComponent
                            value={email}
                            onChangeText={setEmail}
                            error={emailError}
                            label="Ingresar usuario"
                            required={true}
                            imageSource={userImg}
                            imageStyle={{ width: 20, height: 20 }}
                        />

                        <View style={styles.spacing}>
                            <BlueButton onPress={handleSend}>
                                Iniciar sesión
                            </BlueButton>
                        </View>


                    </View>
                    <TouchableOpacity
                        style={styles.linkContainer}

                    >
                        <Text style={styles.link}>¿Has olvidado tu contraseña?</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <MessageModal
                show={showModal}
                message={modalMessage}
                onClose={() => setShowModal(false)}
                type={modalType}
            />

        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        marginTop: 12
    },
    contentLogo: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        marginBottom: Spacing.margin.betweenItems
    },
    loginLogo: {
        height: 120,
        width: 200,
        marginBottom: Spacing.margin.small,
        marginTop: Spacing.margin.betweenItems,
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
    },
    title: {
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 36,
        marginBottom: 36,
        color: Colors.blue
    },
    linkContainer: {
        marginTop: Spacing.margin.large,
        alignSelf: 'center'
    },
    link: {
        color: Colors.violet,
        fontWeight: '500',
        textDecorationLine: 'none'
    },
    spacing: {
        marginBottom: 16,
        marginTop: 8
    }
});
