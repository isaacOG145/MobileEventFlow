import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors, Spacing, fontSizes } from "../config/Styles";
import BlueButton from "../components/BlueButton";
import PurpleButton from "../components/PurpleButton";
import { cancelUser } from '../config/Api';

export default function DeleteAccount({
    onConfirm,
    onCancel,
    isProcessing
}) {
    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <>
            <Text style={styles.title}>¿Seguro que quieres eliminar tu cuenta?</Text>

            {isProcessing ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Cerrando sesión...</Text>
                </View>
            ) : (
                <>
                    <View style={styles.margin}>
                        <BlueButton onPress={handleConfirm} disabled={isProcessing}>
                            Confirmar
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