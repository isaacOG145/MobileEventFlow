import React,{useContext}from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import BlueButton from '../components/BlueButton';
import { Colors, Spacing, fontSizes } from '../config/Styles'; 
import { AuthContext } from '../context/AuthContext';

const logo = require('../../assets/logo/logoCharge.png');
const { width } = Dimensions.get('window');

export default function AdminScreen({ navigation }) {
  const { logout } = useContext(AuthContext);

  const handleGoBack = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image 
          source={logo} 
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Acceso restringido</Text>
        
        <Text style={styles.text}>
          Esta aplicación solo puede ser usada por checadores y usuarios registrados.
        </Text>
        
        <View style={styles.buttonContainer}>
          <BlueButton 
            onPress={handleGoBack}
            style={styles.button}
          >
            Volver al login
          </BlueButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: Spacing.padding.large,
  },
  card: {
    width: width * 0.85,
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    padding: Spacing.padding.xxlarge,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: Spacing.margin.large,
  },
  title: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: Colors.error, // Rojo o color que denote advertencia
    marginBottom: Spacing.margin.medium,
    textAlign: 'center',
  },
  text: {
    fontSize: fontSizes.medium,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.margin.xxlarge,
  },
  buttonContainer: {
    width: '100%',
    marginTop: Spacing.margin.medium,
  },
  button: {
    width: '100%',
  }
});