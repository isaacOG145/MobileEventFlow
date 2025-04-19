// InscriptionsStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyInscriptions from '../../screens/MyInscriptions';
import InscriptionDetails from '../../screens/InscriptionDetails';

const Stack = createNativeStackNavigator();

export default function InscriptionsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyInscriptionsMain" component={MyInscriptions} />
      <Stack.Screen name="MyInscriptionDetails" component={InscriptionDetails} />
    </Stack.Navigator>
  );
}
