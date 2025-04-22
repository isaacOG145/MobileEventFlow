import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors, ModalStyles, Spacing, fontSizes } from '../config/Styles';
import { ScrollView } from 'react-native-gesture-handler';
import { getAssingments, getUserProfile } from "../config/Api";
import CustomHeader from '../components/CustomHeader';
import ActivityCard from '../components/ActivityCard';
import MessageModal from '../components/MessageModal';
import { useNavigation } from '@react-navigation/native';

export default function MyAssignments() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNotification, setShowNotification] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState('success');
    const navigation = useNavigation();


    const loadData = async () => {
        try {
            showMessage('loading', 'Cargando asignaciones');
            const user = await getUserProfile();
            const AssignmentsData = await getAssingments(user.userId);

            if (AssignmentsData.type === 'SUCCESS') {
                setShowNotification(false); 
                setAssignments(AssignmentsData.result);
            }
        } catch (error) {
            console.log(error);
            showMessage('error', 'Error al cargar los talleres');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const showMessage = (type, message) => {
        setModalType(type);
        setModalMessage(message);
        setShowNotification(true);
    };

    const showDetails = (activityId) => {
        navigation.navigate('AssignmentsDetails', { activityId: activityId })
    }


    return (
        <View style={styles.container}>
            <CustomHeader />
            <ScrollView
                contentContainerStyle={styles.scrollContent}>

                <Text style={styles.title}>Tus asignaciones</Text>

                {loading && assignments.length === 0 ? (
                    <Text style={styles.loadingText}>Cargando talleres...</Text>
                ) : (
                    assignments.length > 0 ? (
                        assignments.map((activity, index) => (
                            <ActivityCard
                                key={index}
                                activity={activity}
                                onPressBlue={() => showDetails(activity.id)}
                                textBlue="Ver detalles"
                            />
                        ))
                    ) : (
                        <Text style={styles.loadingText}>No tienes asignaciones aún.</Text>
                    )
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
