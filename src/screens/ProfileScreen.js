import React,{useState, useEffect} from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Colors, ModalStyles, Spacing } from '../config/Styles';
import CustomHeader from '../components/CustomHeader';
import { ScrollView } from 'react-native-gesture-handler';
import BlueButton from "../components/BlueButton";
import PurpleButton from '../components/PurpleButton';
import { useNavigation } from '@react-navigation/native';
import { getUserProfile, getUserInfo } from "../config/Api";
import { formatDate } from "../utils/DateUtils";

export default function ProfileScreen() {
    const navigation = useNavigation();
    const [userData,setUserData] = useState({
        name: '',
        lastName: '',
        cellphone: '',
        birthday: '',
        email: '',
        address: '',
        job: '',
        workplace:'',
        howFound: ''
    });

   

    const loadProfile = async () => {
            try {
                const user = await getUserProfile();
                const userInfo = await getUserInfo(user.userId);
                const profile = userInfo.result;
                setUserData({
                    name: profile?.name || '',
                    lastName: profile?.lastName || '',
                    email: profile?.email || '',
                    cellphone: profile?.cellphone || '',
                    birthday: profile?.birthday || '',
                    address: profile?.address || '',
                    job: profile?.job || '',
                    workplace: profile?.workplace || '',
                    howFound: profile?.howFound || ''
                });
                
            } catch (error) {
                console.error('Error cargando el perfil:', error.message);
            }
        };

        useEffect(() => {
            
            loadProfile();
        
    }, []);

    const handleEdit = () => {
        navigation.navigate('UpdateProfile')
    }
    const handleChangePassword = () => {
        navigation.navigate('ChangePassword')
    }

    const renderField = (label, value) => {
        if (!value) return null;
        return <Text>{label}: {value}</Text>;
    };
    

    return (
        <View style={styles.container}>
            <CustomHeader />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
            >

                <View style={styles.card}>
                    <Text style={styles.title}>Perfil</Text>

                    <Text>Nombre: {userData.name} {userData.lastName}</Text>
                    <Text>Email: {userData.email}</Text>
                    <Text>Télefono; {userData.cellphone}</Text>
                    {renderField("Fecha de nacimiento", )}
                    {renderField("Dirección", formatDate(userData.address))}
                    {renderField("Profesión", userData.job)}
                    {renderField("Lugar de trabajo", userData.workplace)}
                    {renderField("¿Cómo nos conociste?", userData.howFound)}

                    <View style={styles.buttonSpacing}>
                        <BlueButton onPress={handleEdit}>Editar perfil</BlueButton>
                    </View>

                    <PurpleButton onPress={handleChangePassword}>Cambiar contraseña</PurpleButton>

                </View>

            </ScrollView>
        </View>
    )
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
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
        paddingHorizontal: 16,
        color: Colors.blue,
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
    card: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 12,
        marginTop: Spacing.margin.large,
        padding: Spacing.padding.xxlarge,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }, buttonSpacing: {
        marginBottom: Spacing.margin.medium,
    },
});