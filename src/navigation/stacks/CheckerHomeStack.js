import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckerHome from '../../screens/CheckerHome';
import InscriptionForCheckers from '../../screens/InscriptionForChecker';

const Stack = createNativeStackNavigator();

export default function CheckerHomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={CheckerHome} />
      <Stack.Screen name="Register" component={InscriptionForCheckers}/>

    </Stack.Navigator>
  );
}
