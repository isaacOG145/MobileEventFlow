import React from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { Colors, fontSizes, Spacing } from "../config/Styles";
import BlueButton from "../components/BlueButton";
import PurpleButton from "../components/PurpleButton";

export default function Inscription({ 
  activityId, 
  onConfirm, 
  onCancel,
  isProcessing 
}){
    const handleConfirm = () => {
        onConfirm(activityId);
    };

    return(
        <>
            <Text style={styles.title}>¿Seguro que te quieres inscribir a este Taller?</Text>
            
            {isProcessing ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Procesando inscripción...</Text>
              </View>
            ) : (
              <>
                <View style={styles.margin}>
                  <BlueButton onPress={handleConfirm} disabled={isProcessing}>
                    Sí, confirmar
                  </BlueButton>
                </View>
                
                <PurpleButton onPress={onCancel} disabled={isProcessing}>
                  Cancelar
                </PurpleButton>
              </>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: fontSizes.large,
        color: Colors.textDark,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: Spacing.margin.large
    },
    margin: {
        marginVertical: Spacing.margin.large
    },
    loadingContainer: {
        alignItems: 'center',
        marginVertical: Spacing.margin.xlarge
    },
    loadingText: {
        marginTop: Spacing.margin.medium,
        color: Colors.textDark
    }
});