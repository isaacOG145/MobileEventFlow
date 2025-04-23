import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Colors, fontSizes } from '../config/Styles'; 

const logo = require('../../assets/logo/logoCharge.png');

export default function LoadingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo con animación de escala */}
        <Image 
          source={logo} 
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.text}>Cargando datos...</Text>
        
        <ActivityIndicator 
          size="large" 
          color={Colors.primary} 
          style={styles.spinner}
        />
        
        <Text style={styles.subtext}>Por favor espere un momento</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background, // Color de fondo
  },
  content: {
    alignItems: 'center',
    padding: 40,
    borderRadius: 20,
    backgroundColor: Colors.cardBackground, // Fondo del contenido
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
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  subtext: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 20,
  },
  spinner: {
    marginVertical: 10,
  }
});