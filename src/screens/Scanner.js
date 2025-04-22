import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Scanner() {
    const [facing, setFacing] = useState("back");
    const [scanned, setScanned] = useState(false);
    const [isCameraActive, setIsCameraActive] = useState(true);
    const [permission, requestPermission] = useCameraPermissions();
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    // Verificar permisos al montar el componente
    useEffect(() => {
        if (permission && permission.granted) {
            setIsLoading(false);
        }
    }, [permission]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.message}>Necesitamos permisos para acceder a la cámara</Text>
                <Button onPress={requestPermission} title="Permitir" color="#0066cc" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === "back" ? "front" : "back"));
    }

    function handleBarCodeScanned({ type, data }) {
        if (!scanned) {
            setScanned(true);
            setIsCameraActive(false);


            const userData = JSON.parse(data);

            navigation.navigate('Confirmation', { userData });

        }
    }

    return (
        <View style={styles.container}>
            {isCameraActive ? (
                <CameraView
                    style={styles.camera}
                    facing={facing}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr", "ean13", "ean8", "upc_a", "upc_e", "code128", "code39", "code93", "itf14", "pdf417"],
                    }}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                >
                    <View style={styles.overlay}>
                        <View style={styles.scanFrame} />
                        <Text style={styles.scanText}>Escanea un código QR</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
                            <Text style={styles.buttonText}>Cambiar Cámara</Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            ) : (
                <View style={styles.cameraOff}>
                    <Text style={styles.cameraOffText}>Cámara pausada</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#000",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    message: {
        textAlign: "center",
        paddingBottom: 20,
        fontSize: 18,
    },
    camera: {
        flex: 1,
    },
    cameraOff: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    cameraOffText: {
        color: "#fff",
        fontSize: 18,
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    scanFrame: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 10,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    scanText: {
        marginTop: 20,
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: "center",
    },
    flipButton: {
        padding: 15,
        backgroundColor: "rgba(0, 102, 204, 0.7)",
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});