import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import { Colors, fontSizes, Spacing } from "../config/Styles";
import CustomHeader from "../components/CustomHeader";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getEventById, getUserActivities } from '../config/Api';
import ActivityCard from "../components/ActivityCard";
import MessageModal from "../components/MessageModal";
import { useNavigation } from '@react-navigation/native';

export default function AssignmentDetails({ route }) {
    const { activityId } = route.params;
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState('success');
    const [showNotification, setShowNotification] = useState(false);
    const [activity, setActivity] = useState(null);
    const [assists, setAssists] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    const tableWidth = width * 0.9; // 90% del ancho de pantalla

    const loadActivity = async () => {
        try {
            showMessage('loading', 'Cargando asignación');
            const assignmentsData = await getEventById(activityId);

            if (assignmentsData.type === 'SUCCESS') {
                setShowNotification(false);
                setActivity(assignmentsData.result);
                await loadUserActivity(); // Cargar asistencias después de cargar la actividad
            }
        } catch (error) {
            console.log(error);
            showMessage('error', 'Error al cargar la actividad');
        }
    }

    const loadUserActivity = async () => {
        try {
            const assignmentUsers = await getUserActivities(activityId);
            console.log(assignmentUsers);
            if (assignmentUsers.type === 'SUCCESS') {
                
                setAssists(assignmentUsers.result);
            }
        } catch (error) {
            console.log(error);
            showMessage('error', 'Error al cargar las asistencias');
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

    // Calcular conteo de asistencias
    const attendanceCount = {
        yes: assists.filter(item => item.verified).length,
        no: assists.filter(item => !item.verified).length
    };

    return (
        <View style={styles.container}>
            <CustomHeader />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>

                <Text style={styles.title}>Asignación</Text>

                {loading ? (
                    <Text style={styles.loadingText}>Cargando asignación...</Text>
                ) : (
                    <>
                        <ActivityCard
                            key={activity?.id}
                            activity={activity}
                            onPressBlue={() => {
                                navigation.goBack();
                            }}
                            textBlue="volver"
                        />

                        <Text style={styles.title}>Lista de asistencia</Text>

                        {assists.length > 0 ? (
                            <View style={[styles.tableContainer, { width: tableWidth }]}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View style={[styles.table, { minWidth: tableWidth - 20 }]}>
                                        {/* Encabezado */}
                                        <View style={styles.headerRow}>
                                            <Text style={[styles.headerCell, styles.numberColumn]}>No.</Text>
                                            <Text style={[styles.headerCell, styles.nameColumn]}>Nombre</Text>
                                            <View style={[styles.headerCell, styles.attendanceColumn]}>
                                                <Text style={styles.headerCellText}>
                                                    Asistencia {attendanceCount.yes}/{attendanceCount.yes + attendanceCount.no}
                                                </Text>
                                            </View>
                                        </View>

                                        {/* Filas de datos */}
                                        {assists.map((userActivity, index) => (
                                            <View key={userActivity.id} style={styles.dataRow}>
                                                <Text style={[styles.dataCell, styles.tdBlue, styles.numberColumn]}>
                                                    {index + 1}
                                                </Text>
                                                <Text 
                                                    style={[styles.dataCell, styles.nameColumn]}
                                                    numberOfLines={1}
                                                    ellipsizeMode="tail"
                                                >
                                                    {`${userActivity.user.name} ${userActivity.user.lastName}`}
                                                </Text>
                                                <View style={[styles.dataCell, styles.attendanceColumn]}>
                                                    <Text style={{
                                                        color: userActivity.verified ? "#28A745" : "#DC3545",
                                                        fontWeight: '500'
                                                    }}>
                                                        {userActivity.verified ? "Asistió" : "No asistió"}
                                                    </Text>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>
                        ) : (
                            <Text style={styles.emptyText}>No hay asistencias registradas</Text>
                        )}
                    </>
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
        alignItems: 'center'
    },
    title: {
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
        color: Colors.primary,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: fontSizes.medium,
        color: Colors.textSecondary,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: fontSizes.medium,
        color: Colors.textSecondary,
    },
    tableContainer: {
        marginTop: 20,
        backgroundColor: '#E5E7E9',
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: Colors.lightGray,
        marginBottom: 8,
        borderRadius: 4,
    },
    dataRow: {
        flexDirection: 'row',
        backgroundColor: Colors.cardBackground,
        marginBottom: 6,
        borderRadius: 4,
    },
    headerCell: {
        paddingVertical: 8,
        paddingHorizontal: 4,
        color: Colors.textSecondary,
        fontWeight: 'bold',
    },
    headerCellText: {
        color: Colors.textSecondary,
        fontWeight: 'bold',
        fontSize: fontSizes.small,
    },
    dataCell: {
        paddingVertical: 10,
        paddingHorizontal: 4,
        color: Colors.textPrimary,
        justifyContent: 'center',
    },
    // Columnas específicas
    numberColumn: {
        width: 40,
        textAlign: 'center',
    },
    nameColumn: {
        width: Dimensions.get('window').width * 0.9 * 0.55,
    },
    attendanceColumn: {
        width: Dimensions.get('window').width * 0.9 * 0.35,
        alignItems: 'center',
    },
    tdBlue: {
        color: Colors.primary,
        fontWeight: '500',
    },
});