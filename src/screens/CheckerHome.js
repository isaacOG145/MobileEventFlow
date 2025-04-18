import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomHeader from '../components/CustomHeader';

export default function CheckerHome({ navigation }) {
  return (
    <View style={styles.container}>
      <CustomHeader/>
      <Text style={styles.text}>🏠 Soy el incio de checker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
});