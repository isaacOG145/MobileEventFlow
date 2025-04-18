import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'; // Cambio clave aquí
import { getUserProfile, getWorkshopsForUser } from '../config/Api';
import { Colors, Spacing } from '../config/Styles';
import CustomHeader from '../components/CustomHeader';
import ActivityCard from '../components/ActivityCard';
import ModalComponent from '../components/ModalComponent';

export default function UserHome({ navigation }) {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const loadData = async () => {
    try {
      const user = await getUserProfile();
      const workshopsData = await getWorkshopsForUser(user.userId);
      
      if (workshopsData.type === 'SUCCESS') {
        setWorkshops(workshopsData.result);
      }
    } catch (error) {
      console.error('Error al cargar talleres:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader />

      {/* ScrollView de gesture-handler con mejor manejo de gestos */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!showModal} // Deshabilita scroll cuando el modal está visible
      >
        <Text style={styles.title}>Talleres disponibles para ti</Text>

        {loading ? (
          <Text style={styles.loadingText}>Cargando talleres...</Text>
        ) : (
          workshops.map((activity, index) => (
            <ActivityCard
              key={index}
              activity={activity}
              onPressBlue={() => setShowModal(true)}
              textBlue="Inscribirse"
            />
          ))
        )}
      </ScrollView>

      {/* Modal con zIndex elevado para asegurar visibilidad */}
      <ModalComponent
        onClose={() => setShowModal(false)}
        show={showModal}
        title="Modal de inscripción"
      >
        <Text style={styles.modalTitle}>Hola soy el modal de inscripción</Text>          
      </ModalComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.padding.medium,
    paddingTop: 10, // Espacio para el header
    paddingBottom: 30, // Más espacio en la parte inferior
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    paddingHorizontal: 16,
    color: '#333', // Color mejorado para contraste
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  modalOverlay: {
    zIndex: 1000, // Asegura que el modal esté por encima de todo
    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo semitransparente
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});