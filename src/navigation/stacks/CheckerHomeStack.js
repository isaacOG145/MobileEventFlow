import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckerHome from '../../screens/CheckerHome';
import InscriptionForChecker from '../../screens/InscriptionForChecker';
import InscriptionWForChecker from '../../screens/InscriptionWForChecker';


const Stack = createNativeStackNavigator();

export default function CheckerHomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={CheckerHome} />
      <Stack.Screen name="RegistertoEvent" component={InscriptionForChecker}/>
      <Stack.Screen name='RegistertoWorkshop' component={InscriptionWForChecker}/>
      

    </Stack.Navigator>
  );
}
