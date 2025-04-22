import React, { useState } from "react";
import { View, StyleSheet, Text } from 'react-native';
import { Colors, Spacing, fontSizes } from "../config/Styles";
import CustomHeader from "../components/CustomHeader";
import { useNavigation } from '@react-navigation/native';
import BlueButton from "../components/BlueButton";
import PurpleButton from "../components/PurpleButton";
import { confirmInscription } from '../config/Api';
import MessageModal from '../components/MessageModal';


export default function ConfirmationScreen({ route }) {
    const { userData } = route.params;
    const navigation = useNavigation();
    const [showNotification, setShowNotification] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState('success');


    const handleConfirm = async (token) => {

        try {
            console.log(token);
            showMessage('loading', 'Registrando asistencia');
            const confirm = await confirmInscription(token);
            console.log (confirm);

            if (confirm.type === "SUCCESS") {
                setTimeout(() => {
                    showMessage('success', '¡Asistencia registrada correctamente!');
                    setShowNotification(true);
                }, 1500)
            }
            ;

        } catch (error) {
            if (error.response) {
                const { text, type } = error.response.data;
                showMessage(type.toLowerCase(), text);
            } else {
                showMessage('error', error.message);
            }
        }
    }

    const showMessage = (type, message) => {
        setModalType(type);
        setModalMessage(message);
        setShowNotification(true);
    };

    return (

        <View style={styles.container}>
            <CustomHeader />

            <View style={styles.content}>

                <View style={styles.card}>
                    <Text style={styles.title}>Datos del evento</Text>

                    <Text style={styles.boldText}>Nombre del evento</Text>
                    <Text style={styles.text}>{userData.eventName}</Text>

                    <Text style={styles.boldText}>Nombre del invitado</Text>
                    <Text style={styles.text}>{userData.userName}</Text>

                    <View style={styles.spacing}>
                        <BlueButton onPress={() => handleConfirm(userData.token)}>Confirmar</BlueButton>
                    </View>
                    <PurpleButton onPress={() => navigation.navigate('Assignments')}>Volver</PurpleButton>

                </View>



            </View>
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
    content: {
        paddingHorizontal: Spacing.padding.medium,
        paddingTop: 10,
        paddingBottom: 30,
    },
    card: {
        width: '90%',
        borderRadius: 12,
        padding: Spacing.padding.card,
        backgroundColor: Colors.cardBackground,
        marginVertical: Spacing.margin.medium,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignSelf: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
        paddingHorizontal: 16,
        color: '#333',
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
    spacing: {
        marginBottom: Spacing.margin.medium,
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
    }
});