import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckerHome from '../../screens/CheckerHome';
import InscriptionForCheckers from '../../screens/InscriptionForChecker';
import InscriptionWForChecker from '../../screens/InscriptionForChecker';

const Stack = createNativeStackNavigator();

export default function CheckerHomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={CheckerHome} />
      <Stack.Screen name="RegistertoEvent" component={InscriptionForCheckers}/>
      <Stack.Screen name="RegisterToWorkshop" component={InscriptionWForChecker}/>

    </Stack.Navigator>
  );
}
