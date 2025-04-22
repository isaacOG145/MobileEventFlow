import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';

const GuestTableMobile = () => {
  // Datos de prueba
  const userActivities = [
    { id: '1', user: { name: 'María', lastName: 'González' }, verified: true },
    { id: '2', user: { name: 'Carlos', lastName: 'Martínez' }, verified: false },
    { id: '3', user: { name: 'Ana', lastName: 'Rodríguez' }, verified: true },
    { id: '4', user: { name: 'Luis', lastName: 'Pérez' }, verified: true },
    { id: '5', user: { name: 'Sofía', lastName: 'Hernández' }, verified: false }
  ];

  // Calcular conteo de asistencias
  const attendanceCount = {
    yes: userActivities.filter(item => item.verified).length,
    no: userActivities.filter(item => !item.verified).length
  };

  return (
    <View style={styles.tableContainer}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          {/* Encabezado */}
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, styles.numberColumn]}>No.</Text>
            <Text style={[styles.headerCell, styles.nameColumn]}>Nombre del invitado</Text>
            <View style={[styles.headerCell, styles.attendanceColumn]}>
              <Text style={styles.headerCellText}>
                Asistencia {attendanceCount.yes}/{attendanceCount.yes + attendanceCount.no}
              </Text>
            </View>
          </View>
          
          {/* Filas de datos */}
          {userActivities.map((userActivity, index) => (
            <View key={userActivity.id} style={styles.dataRow}>
              <Text style={[styles.dataCell, styles.tdBlue, styles.numberColumn]}>
                {index + 1}
              </Text>
              <Text style={[styles.dataCell, styles.nameColumn]}>
                {`${userActivity.user.name} ${userActivity.user.lastName}`}
              </Text>
              <View style={[styles.dataCell, styles.attendanceColumn]}>
                <Text style={{
                  color: userActivity.verified ? "#28A745" : "#DC3545",
                  fontWeight: '500'
                }}>
                  {userActivity.verified ? "Asistió" : "No asistió"}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');
const tableWidth = width * 0.9; // 90% del ancho de pantalla

const styles = StyleSheet.create({
  tableContainer: {
    marginTop: 20,
    backgroundColor: '#E5E7E9',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'center',
    width: tableWidth,
  },
  table: {
    minWidth: tableWidth - 20, // Ajuste para el padding
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#E5E7E9',
    marginBottom: 8,
  },
  dataRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 6,
    borderRadius: 4,
  },
  headerCell: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    color: '#909497',
    fontWeight: 'bold',
  },
  headerCellText: {
    color: '#909497',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dataCell: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    color: '#000',
    justifyContent: 'center',
  },
  // Columnas específicas
  numberColumn: {
    width: 40, // Ancho fijo para la columna de número
    textAlign: 'center',
  },
  nameColumn: {
    width: tableWidth * 0.55, // 55% del ancho para nombres
    flexShrink: 1, // Permite que el texto se ajuste
  },
  attendanceColumn: {
    width: tableWidth * 0.35, // 35% del ancho para asistencia
    alignItems: 'center',
  },
  tdBlue: {
    color: '#142EA9',
    fontWeight: '500',
  },
});

export default GuestTableMobile;