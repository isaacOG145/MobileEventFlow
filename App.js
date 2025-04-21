import React from 'react';
import 'react-native-gesture-handler'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}> {/* Envuelve todo aquí */}
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}