import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import CustomHeader from "../components/CustomHeader";
import { ScrollView } from 'react-native-gesture-handler';
import { BorderRadius, Colors, Spacing, fontSizes } from "../config/Styles";
import { useNavigation } from '@react-navigation/native';
import { RegisterToEvent, registerUser } from "../config/Api";
import InputComponent from '../components/InputComponent';
import SelectInputComponent from "../components/SelectInputComponent";
import BirthDateComponent from "../components/BirthDateComponent";
import BlueButton from "../components/BlueButton";
import PurpleButton from "../components/PurpleButton";
import MessageModal from "../components/MessageModal";
import { SafeAreaView } from "react-native-safe-area-context";

const userImg = require('../../assets/icons/user.png');
const emailImg = require('../../assets/icons/sobres.png');
const cellphoneImg = require('../../assets/icons/telefono-inteligente.png');
const addressImg = require('../../assets/icons/edificio-de-oficinas.png');
const genderImg = require('../../assets/icons/generos.png');
const birthImg = require('../../assets/icons/calendario-black.png');
const jobImg = require('../../assets/icons/trabajo.png');
const workPlaceImg = require('../../assets/icons/edificio-de-oficinas.png');
const howImg = require('../../assets/icons/periodico.png');

export default function InscriptionForChecker({ route }) {
    const { activityId } = route.params;
    const navigation = useNavigation();
    const [showNotification, setShowNotification] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState('success');

    const [user, setUser] = useState({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        birthday: '',
        job: '',
        workPlace: '',
        howFound: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        birthday: '',
        job: '',
        workPlace: '',
        howFound: '',
    });

    const validateField = (field, value) => {
        let error = '';

        if (!value.trim()) {
            error = 'Este campo es requerido';
        } else {
            if (field === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    error = 'Correo electrónico inválido';
                }
            }

            if (field === 'phone') {
                const phoneRegex = /^\d{10}$/;
                if (!phoneRegex.test(value)) {
                    error = 'El teléfono debe tener 10 dígitos numéricos';
                }
            }
        }

        setErrors(prev => ({ ...prev, [field]: error }));
        return error === '';
    };


    const handleRegister = async () => {
        // Validar todos los campos
        let isValid = true;
        for (const field in user) {
            const valid = validateField(field, user[field]);
            if (!valid) isValid = false;
        }

        if (!isValid) {

            return;
        }

        try {
            const userResponse = await registerUser(user);

            if (userResponse) {
                const userId = userResponse.result.id;
                console.log(user.id);
                await RegisterToEvent(userId, activityId);

                showMessage('success', 'Usuario registrado y asignado al evento exitosamente');

                setUser({
                    name: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    address: '',
                    gender: '',
                    birthday: '',
                    job: '',
                    workPlace: '',
                    howFound: '',
                });
            } else {
                showMessage('error', 'No se pudo registrar el usuario');
            }
        } catch (error) {
            console.error(error);
            showMessage('error', 'Ocurrió un error durante el registro');
        }
    };

    const invertirCadena = (cadena) => {
        return cadena.split('').reverse().join('');
    };


    const showMessage = (type, message) => {
        setModalType(type);
        setModalMessage(message);
        setShowNotification(true);
    };

    return (
        <View style={styles.container}>
            <CustomHeader />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <Text style={styles.title}>Registrar usuario</Text>

                    <InputComponent
                        value={user.name}
                        onChangeText={(text) => {
                            setUser(prev => ({ ...prev, name: text }));
                            validateField('name', text);
                        }}
                        error={errors.name}
                        label="Nombre"
                        required={true}
                        imageSource={userImg}
                        imageStyle={{ width: 20, height: 20 }}
                    />

                    <InputComponent
                        value={user.lastName}
                        onChangeText={(text) => {
                            setUser(prev => ({ ...prev, lastName: text }));
                            validateField('lastName', text);
                        }}
                        error={errors.lastName}
                        label="Apellidos"
                        required={true}
                        imageSource={userImg}
                        imageStyle={{ width: 20, height: 20 }}
                    />

                    <InputComponent
                        value={user.email}
                        onChangeText={(text) => {
                            setUser(prev => ({ ...prev, email: text }));
                            validateField('email', text);
                        }}
                        error={errors.email}
                        label="Email"
                        required={true}
                        imageSource={emailImg}
                        imageStyle={{ width: 25, height: 25 }}
                    />

                    <InputComponent
                        value={user.phone}
                        onChangeText={(text) => {
                            setUser(prev => ({ ...prev, phone: text }));
                            validateField('phone', text);
                        }}
                        error={errors.phone}
                        label="Telefono"
                        required={true}
                        imageSource={cellphoneImg}
                        imageStyle={{ width: 20, height: 20 }}
                    />

                    <SelectInputComponent
                        label="Género"
                        required={true}
                        value={user.gender}
                        onValueChange={(val) => {
                            setUser(prev => ({ ...prev, gender: val }));
                            validateField('gender', val);
                        }}
                        options={[
                            { value: 'masculino', label: 'Masculino' },
                            { value: 'femenino', label: 'Femenino' },
                            { value: 'otro', label: 'Otro' }
                        ]}
                        error={errors.gender}
                        imageSource={genderImg}
                    />

                    <BirthDateComponent
                        label="Fecha de nacimiento"
                        value={user.birthday}  // Usamos el valor del estado
                        onChange={(date) => {
                            setUser(prev => ({ ...prev, birthday: date }));
                            validateField('birthday', date);
                        }}
                        error={errors.birthday}
                        required={true}
                        imageSource={birthImg}
                        imageSize={24}
                    />


                    <InputComponent
                        value={user.address}
                        onChangeText={(text) => {
                            setUser(prev => ({ ...prev, address: text }));
                            validateField('address', text);
                        }}
                        error={errors.address}
                        label="Domicilio"
                        required={true}
                        imageSource={addressImg}
                        imageStyle={{ width: 20, height: 20 }}
                    />

                    <InputComponent
                        value={user.job}
                        onChangeText={(text) => {
                            setUser(prev => ({ ...prev, job: text }));
                            validateField('job', text);
                        }}
                        error={errors.job}
                        label="Ocupación"
                        required={true}
                        imageSource={jobImg}
                        imageStyle={{ width: 20, height: 20 }}
                    />

                    <InputComponent
                        value={user.workPlace}
                        onChangeText={(text) => {
                            setUser(prev => ({ ...prev, workPlace: text }));
                            validateField('workPlace', text);
                        }}
                        error={errors.workPlace}
                        label="Lugar de trabajo"
                        required={true}
                        imageSource={workPlaceImg}
                        imageStyle={{ width: 20, height: 20 }}
                    />

                    <InputComponent
                        value={user.howFound}
                        onChangeText={(text) => {
                            setUser(prev => ({ ...prev, howFound: text }));
                            validateField('howFound', text);
                        }}
                        error={errors.howFound}
                        label="Medio de difusión"
                        required={true}
                        imageSource={howImg}
                        imageStyle={{ width: 20, height: 20 }}
                    />

                    <View style={styles.spacing}>
                        <BlueButton onPress={handleRegister}>
                            Registrar
                        </BlueButton>
                    </View>
                    <PurpleButton onPress={() => navigation.goBack()}>
                        Regresar
                    </PurpleButton>

                </View>
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
        alignItems: 'center'
    },
    card: {
        width: '85%',
        borderRadius: BorderRadius.xlarge,
        padding: Spacing.padding.xxlarge,
        backgroundColor: Colors.cardBackground,
        marginTop: Spacing.margin.betweenItems,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: fontSizes.large,
        fontWeight: '700',
        color: Colors.blue,
        marginBottom: Spacing.margin.betweenItems
    },
    spacing: {
        marginTop: Spacing.margin.betweenItems,
        marginBottom: Spacing.margin.betweenItems,
        width: '100%'
    }
});