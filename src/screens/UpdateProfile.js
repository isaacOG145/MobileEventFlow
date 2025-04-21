import React from "react";
import { StyleSheet, View, Text } from "react-native";
import CustomHeader from '../components/CustomHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors, Spacing, ModalStyles, fontSizes  } from "../config/Styles";

export default function UpdateProfile(){
    return (
        <View style={styles.container}>
            <CustomHeader/>
            <ScrollView
            contentContainerStyle={styles.scrollContent}>
                
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