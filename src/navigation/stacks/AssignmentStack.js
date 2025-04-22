import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AssignmentDetails from '../../screens/AssignmentDetails';
import MyAssignments from '../../screens/MyAssignments';
import Scanner from '../../screens/Scanner';
import ConfirmationScreen from '../../screens/ConfirmationScreen';

const Stack = createNativeStackNavigator();

export default function AssignmentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Assignments" component={MyAssignments} />
      <Stack.Screen name="AssignmentsDetails" component={AssignmentDetails} />
      <Stack.Screen name='Scanner' component={Scanner}/>
      <Stack.Screen name='Confirmation' component={ConfirmationScreen}/>

    </Stack.Navigator>
  );
}
