import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, fontSizes, Spacing } from "../config/Styles";
import CustomHeader from "../components/CustomHeader";
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getEventById, getUserActivities } from '../config/Api';
import ActivityCard from "../components/ActivityCard";
import MessageModal from "../components/MessageModal";
import { useNavigation } from '@react-navigation/native';
import GuestTableWithMockData from "../mocks/GuestTableWithMockData";

export default function assignmentDetails({ route }) {
    const { activityId } = route.params;
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState('success');
    const [showNotification, setShowNotification] = useState(false);
    const [activity, setActivity] = useState("");
    const [assists, setAssists] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const loadActivity = async () => {
        try {
            showMessage('loading', 'Cargando asignación');
            const AssignmentsData = await getEventById(activityId);

            if (AssignmentsData.type === 'SUCCESS') {
                setShowNotification(false);
                setActivity(AssignmentsData.result);
            }
        } catch (error) {
            console.log(error);
            showMessage('error', 'Error al cargar la actividad');
        } finally {
            setLoading(false);
        }
    }

    const loadUserActivity = async () => {
        try{
            showMessage('loading', 'cargando lista de asistencias');
            const AssignmentUsers = await  getUserActivities(activityId);

            if(AssignmentUsers.type === 'SUCCESS'){
                setShowNotification(false);
                setAssists(AssignmentUsers.result);

            }
        } catch (error) {
            console.log(error);
            showMessage('error', 'Error al cargar la actividad');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadActivity();
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
                contentContainerStyle={styles.scrollContent}>

                <Text style={styles.title}>Asignación</Text>

                {loading ? (
                    <Text style={styles.loadingText}>Cargando asignación</Text>
                ) : (
                    <ActivityCard
                        key={activity.id}
                        activity={activity}
                        onPressBlue={() => {
                            setSelectedActivityId(activity.id);
                            setShowModal(true);
                        }}
                        textBlue="Inscribirse"
                    />
                )}

                <Text style={styles.title}>Lista de asistencia</Text>

                <GuestTableWithMockData/>



            </ScrollView>

            <SafeAreaView>
                <MessageModal
                    show={showNotification}
                    message={modalMessage}
                    onClose={() => setShowNotification(false)}
                    type={modalType}
                />
            </SafeAreaView>


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