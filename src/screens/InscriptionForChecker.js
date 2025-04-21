import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import CustomHeader from "../components/CustomHeader";
import { ScrollView } from 'react-native-gesture-handler';
import { BorderRadius, Colors, Spacing, fontSizes } from "../config/Styles";
import { useNavigation } from '@react-navigation/native';
import InputComponent from '../components/InputComponent';
import SelectInputComponent from "../components/SelectInputComponent";
import BirthDateComponent from "../components/BirthDateComponent";
import BlueButton from "../components/BlueButton";

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

    const [user, setUser] = useState({
        name: '',
        lastName: '',
        email: '',
        cellphone: '',
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
        cellphone: '',
        address: '',
        gender: '',
        birthday: '',
        job: '',
        workPlace: '',
        howFound: '',
    });

    const validateField = (field, value) => {
        if (!value.trim()) {
            setErrors(prev => ({ ...prev, [field]: 'Este campo es requerido' }));
            return false;
        }
        setErrors(prev => ({ ...prev, [field]: '' }));
        return true;
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
                        value={user.cellphone}
                        onChangeText={(text) => {
                            setUser(prev => ({ ...prev, cellphone: text }));
                            validateField('cellphone', text);
                        }}
                        error={errors.cellphone}
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

                    <BlueButton>Registrar</BlueButton>
                </View>
            </ScrollView>
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
    }
});