import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from "react-native";
import { Spacing, Colors, fontSizes, BorderRadius, ModalStyles } from "../config/Styles";
import { getUserActivityInscription, getUserProfile, cancelInscription } from "../config/Api";
import { formatDate, formatTime } from "../utils/DateUtils";
import { useNavigation } from '@react-navigation/native'
import CancelInscription from "../modals/CancelInscription";
import QRCode from "react-native-qrcode-svg";
import CustomHeader from "../components/CustomHeader";
import MessageModal from "../components/MessageModal";
import BlueButton from "../components/BlueButton";
import PurpleButton from "../components/PurpleButton";

export default function InscriptionDetails({ route }) {
    const { id } = route.params;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [inscription, setInscription] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState('success');
    const [isEventToday, setIsEventToday] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedInscriptionId, setSelectedInscriptionId] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const { height, width } = Dimensions.get('window');

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

    const handleCancel = async (inscriptionId) => {
        try {
            setIsRegistering(true);
            await cancelInscription(inscriptionId);
            setTimeout(() => {
                showMessage('success', '¡Cancelación exitosa!');
                setShowModal(false);
                returnPage();
            }, 1500)

            loadData();
        } catch (error) {
            if (error.response) {
                console.log(error);
                const { text, type } = error.response.data;
                showMessage(type.toLowerCase(), text);
                setShowModal(false);
            } else {
                showMessage('error', error.message);
                setShowModal(false);
            }
        } finally {
            setIsRegistering(false);
            setShowModal(false);
        }
    }



    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (inscription?.activity) {
            // Recogemos la fecha principal o, si es taller, la de fromActivity
            const rawDate =
                inscription.activity.date ??
                inscription.activity.fromActivity?.date;

            if (rawDate) {
                const today = new Date();
                const eventDate = new Date(rawDate);

                const isSameDay =
                    today.getFullYear() === eventDate.getFullYear() &&
                    today.getMonth() === eventDate.getMonth() &&
                    today.getDate() === eventDate.getDate();

                setIsEventToday(isSameDay);
            } else {
                // No hay fecha; puede ser un caso inesperado
                setIsEventToday(false);
                console.warn("No se encontró fecha de evento en inscription.activity", inscription);
            }
        }
    }, [inscription]);


    const showMessage = (type, message) => {
        setModalType(type);
        setModalMessage(message);
        setShowNotification(true);
    };

    const generateQRData = () => {
        if (!inscription) return '';

        return JSON.stringify({
            token: inscription.token, // El token único que ya usas en el backend
            eventName: inscription.activity.name,
            userName: `${inscription.user.name} ${inscription.user.lastName}`,
        });
    };

    const returnPage = () => {
        navigation.goBack();
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

                        <Text style={styles.infoText}>Acceso para: {inscription.user.name} {inscription.user.lastName}</Text>

                        {isEventToday ? (

                            <>
                                <View style={styles.qrContainer}>
                                    <QRCode
                                        value={generateQRData()}
                                        size={200}
                                        color={Colors.textDark}
                                        backgroundColor={Colors.cardBackground}
                                        logoBackgroundColor="transparent"
                                    />
                                    <Text style={styles.qrText}>Código de acceso al evento</Text>
                                </View>


                            </>
                        ) : (
                            <View style={styles.qrContainer}>
                                <Image
                                    source={require('../../assets/icons/scan.png')}
                                    style={{ width: 200, height: 200 }}
                                    resizeMode="contain"
                                />
                                <Text style={styles.qrText}>
                                    El QR se mostrara el dia del evento
                                </Text>
                            </View>

                        )}


                        <View style={styles.buttonSpacing}>
                            <BlueButton onPress={returnPage}>
                                Cerrar
                            </BlueButton>
                        </View>

                        <PurpleButton onPress={() => {
                            setSelectedInscriptionId(inscription.id);
                            setShowModal(true);
                        }}>Cancelar inscripción</PurpleButton>
                    </View>
                ) : (
                    <Text style={styles.noDataText}>No se encontraron datos de inscripción</Text>
                )}
            </View>
            {/* Modal embebido directamente en la vista */}
            {showModal && (
                <View style={[ModalStyles.overlay, styles.cover]}>
                    <TouchableOpacity
                        style={ModalStyles.overlayTouchable}
                        activeOpacity={1}
                        onPress={() => setShowModal(false)}
                    />

                    <View style={[ModalStyles.container, {
                        maxHeight: height * 0.7,
                        width: width * 0.9
                    }]}>



                        <View style={ModalStyles.content}>
                            <CancelInscription
                                inscriptionId={selectedInscriptionId}
                                onCancel={() => !isRegistering && setShowModal(false)}
                                onConfirm={handleCancel}
                                isProcessing={isRegistering}
                            />
                        </View>
                    </View>
                </View>
            )}
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
    },
    buttonSpacing: {
        marginBottom: Spacing.margin.medium,
        width: '100%'
    },
    qrContainer: {
        marginVertical: Spacing.margin.medium,
        alignItems: 'center',
        padding: Spacing.padding.medium,
        backgroundColor: 'white',
        borderRadius: BorderRadius.medium,

    },
    qrText: {
        marginTop: Spacing.margin.medium,
        fontSize: fontSizes.small,
        color: Colors.textDark,
        fontWeight: 'bold',
    },
    cover: {
        ...StyleSheet.absoluteFillObject,
    }
});