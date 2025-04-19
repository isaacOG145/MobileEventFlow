import React, { useState, useEffect } from "react";
import { Colors, Spacing, fontSizes, ModalStyles } from "../config/Styles";
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from "react-native";
import { getActivitiesForUser, getUserProfile } from "../config/Api";
import MessageModal from "../components/MessageModal";
import CustomHeader from "../components/CustomHeader";
import ActivityCard from "../components/ActivityCard";

export default function Myinscriptions() {
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [activities, setActivities] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState('success');
    const [selectedActivityId, setSelectedActivityId] = useState("");

    const loadData = async () => {
        try {
            showMessage('loading', 'Cargando Actividades.');
            const user = await getUserProfile();
            const activitiesData = await getActivitiesForUser(user.userId);

            if (activitiesData.type === 'SUCCESS') {
                setShowNotification(false);
                setActivities(activitiesData.result);
            }
        } catch (error) {
            console.log(error);
            showMessage('error', 'Error al cargar las actividades');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const showMessage = (type, message) => {
        setModalType(type);
        setModalMessage(message);
        setShowNotification(true);
    };

    return (
        <View style={styles.container}>
            <CustomHeader />
            <ScrollView
                style={styles.scrollContent}
                scrollEnabled={!showModal}>
                <Text style={styles.title}>Tus Proximos eventos y tallers</Text>

                {loading ? (
                    <Text style={styles.loadingText}>Cargando talleres...</Text>
                ) : (
                    activities.map((activity, index) => (
                        <ActivityCard
                            key={index}
                            activity={activity}
                            onPressBlue={() => {
                                setSelectedActivityId(activity.id); 
                                setShowModal(true);
                            }}
                            textBlue="Mostrar detalles"
                        />
                    ))
                )}
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
    }
});

