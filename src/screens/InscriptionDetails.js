import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Spacing, Colors, fontSizes, BorderRadius } from "../config/Styles";
import { getUserActivityInscription, getUserProfile } from "../config/Api";
import CustomHeader from "../components/CustomHeader";
import MessageModal from "../components/MessageModal";

export default function InscriptionDetails({ route }) {
    const { id } = route.params;
    const [loading, setLoading] = useState(true);
    const [inscription, setInscription] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState('success');

    const loadData = async () => {
        try {
            showMessage('loading', 'Cargando inscripción...');
            
            const user = await getUserProfile();
            const response = await getUserActivityInscription(user.userId, id);

            if (!response) {
                throw new Error('No se recibió respuesta del servidor');
            }

            if (response.type === 'SUCCESS') {
                 console.log(response.data);
                setShowNotification(false);
            } else {
                throw new Error(response.message || 'Error al obtener la inscripción');
            }
        } catch (error) {
            console.error('Error en loadData:', error);
            showMessage('error', error.message || 'Error al cargar la inscripción');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [id]);

    const showMessage = (type, message) => {
        setModalType(type);
        setModalMessage(message);
        setShowNotification(true);
    };

    return (
        <View style={styles.mainContainer}>
            <CustomHeader />
            <View style={styles.content}>

                <View style={styles.card}>
                    <Text style={styles.title}>Detalles de la Inscripción</Text>
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
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: Spacing.padding.medium,
        paddingTop: 10,
        paddingBottom: 30,
    },
    title: {
        fontSize: fontSizes.medium,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 16,
        color: '#333',
    },
    card: {
        marginTop: Spacing.margin.large,
        width: '80%',
        borderRadius: BorderRadius.large,
        backgroundColor: Colors.cardBackground,
        padding: Spacing.padding.card
    }
});