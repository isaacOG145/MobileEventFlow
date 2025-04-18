import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function LoadingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Soy la pantalla de carga</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
});