import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Spacing, Colors, fontSizes, BorderRadius } from "../config/Styles";
import { getUserActivityInscription, getUserProfile } from "../config/Api";
import { formatDate, formatTime } from "../utils/DateUtils";
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

            // Obtener el perfil del usuario
            const user = await getUserProfile();
            const inscription = await getUserActivityInscription(user.userId, id);

            console.log('Inscripción:', inscription);
            setInscription(inscription);
            setShowNotification(false);

        } catch (error) {
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


                {inscription ? (
                    <View style={styles.card}>


                        <Text style={styles.title}>{inscription.activity.name}</Text>

                        <View style={styles.rowContainer}>
                            {inscription.activity.date ? (
                                <View style={[styles.badge, styles.backgroundViolet]}>
                                    <Text style={styles.badgeText}>Fecha: {formatDate(inscription.activity.date)}</Text>
                                </View>


                            ) : (
                                <View style={[styles.badge, styles.backgroundViolet]}>
                                    <Text style={styles.badgeText}>Hora: {formatTime(inscription.activity.time)}</Text>
                                </View>
                            )

                            }
                            {inscription.activity.typeActivity === "EVENT" ? (
                                <View style={[styles.badge, styles.backgroundBlue]}>
                                    <Text style={styles.badgeText}>Evento</Text>
                                </View>
                            ) : (
                                <View style={[styles.badge, styles.backgroundBlue]}>
                                    <Text style={styles.badgeText}>Taller</Text>
                                </View>
                            )

                            }



                        </View>
                        <View style={styles.infoText}>
                            <Text>{inscription.activity.description}</Text>
                            <Text>{inscription.user.name} {inscription.user.lastName}</Text>
                            <Text>{inscription.user.email}</Text>
                            <Text>{inscription.user.phone}</Text>
                        </View>


                        
                        
                        


                    </View>
                ) : (
                    <Text style={styles.noDataText}>No se encontraron datos de inscripción</Text>
                )}

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
    }, rowContainer: {
        flexDirection: 'row',
    },
    title: {
        fontSize: fontSizes.medium,
        fontWeight: 'bold',
        textAlign: 'justify',
        paddingHorizontal: 16,
        color: Colors.textDark
    },
    infoText: {
        fontSize: fontSizes.small,
        fontWeight: 'bold',
        textAlign: 'justify',
        color: Colors.textDark
    },
    card: {
        marginTop: Spacing.margin.large,
        width: '80%',
        borderRadius: BorderRadius.large,
        backgroundColor: Colors.cardBackground,
        padding: Spacing.padding.card,
        alignItems: 'center'
    },
    subTitle: {
        fontSize: fontSizes.medium,
        fontWeight: '400',
        marginTop: Spacing.margin.small,
        color: Colors.blue
    }, badge: {
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 2,
        marginVertical: 4,
        marginRight: 12,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundViolet: {
        backgroundColor: Colors.violet
    },
    backgroundPurple: {
        backgroundColor: Colors.purple
    },
    backgroundBlue: {
        backgroundColor: Colors.blue
    },
    backgroundGreen: {
        backgroundColor: Colors.green
    },
    backgroundRed: {
        backgroundColor: Colors.red
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    }
});