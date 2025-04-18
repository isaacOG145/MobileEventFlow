import React from "react";
import { View, StyleSheet, Image, StatusBar } from "react-native";
import { Colors, Spacing } from "../config/Styles";

export default function CustomHeader() {
    return (
        <>
            <StatusBar backgroundColor={Colors.violet} barStyle="light-content" />
            <View style={styles.header}>
                <Image
                    source={require('../../assets/logo/logoHeader.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.violet,
        padding: Spacing.medium,
        flexDirection: 'row',  // Añade esto para alinear elementos horizontalmente
        alignItems: 'center',  // Centra verticalmente el logo
        width: '100%',
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
        height: 56,
        width: 220,
        marginLeft: Spacing.margin.small,  // Añade un pequeño margen izquierdo si lo deseas
        // aspectRatio: 220/56 // Opcional: mantener si necesitas proporción exacta
    }
});