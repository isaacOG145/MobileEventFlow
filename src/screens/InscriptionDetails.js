import React from "react";
import { View, Text } from "react-native";
import CustomHeader from "../components/CustomHeader";

export default function InscriptionDetails({ route }){
    const { id } = route.params;

    return(
        <View>

            <CustomHeader/>
            <Text>Soy la pantalla de inscripcion</Text>
        </View>
    );
}