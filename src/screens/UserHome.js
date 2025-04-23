import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getUserProfile, getWorkshopsForUser, registerToWorkshop } from '../config/Api';
import { Colors, ModalStyles, Spacing } from '../config/Styles';
import Inscription from '../modals/Inscription';
import CustomHeader from '../components/CustomHeader';
import ActivityCard from '../components/ActivityCard';
import MessageModal from '../components/MessageModal';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function UserHome({ navigation }) {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { height, width } = Dimensions.get('window');
  const [showNotification, setShowNotification] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState('success');
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [hasWorkshops, setHasWorkshops] = useState(true);

  const loadData = async () => {
    try {
      showMessage('loading', 'Cargando talleres...');
      const user = await getUserProfile();
      const workshopsData = await getWorkshopsForUser(user.userId);

      if (workshopsData.type === 'SUCCESS') {
        setWorkshops(workshopsData.result);
        setHasWorkshops(workshopsData.result.length > 0);
        setShowNotification(false);
      } else {
        setHasWorkshops(false);
        showMessage('warning', 'No hay talleres disponibles actualmente');
      }
    } catch (error) {
      console.error(error);
      setHasWorkshops(false);
      showMessage('error', 'Error al cargar los talleres');
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async (activityId) => {
    try {
      setIsRegistering(true);
      setShowModal(false);
      showMessage('loading', 'registrando');
      const user = await getUserProfile();
      await registerToWorkshop(user.userId, activityId);
      setTimeout(() => {
        showMessage('success', '¡Inscripción exitosa!'); // 2. Luego muestra el mensaje
      }, 300); // 3. Pequeño delay para asegurar cierre visual

      loadData();


    } catch (error) {
      if (error.response) {
        console.log(error);
        const { text, type } = error.response.data;
        setShowModal(false);
        setTimeout(() => {
          showMessage(type.toLowerCase(), text);
        }, 300);
      } else {
        showMessage('error', error.message);
        setShowModal(false);
      }
    } finally {
      setIsRegistering(false);
      setShowModal(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showMessage = (type, message) => {
    setModalType(type);
    setModalMessage(message);
    setShowNotification(true);
  };

  return (
    <View style={styles.container}>
      <CustomHeader />

      <ScrollView
        contentContainerStyle={styles.scrollContent}

      >
        <Text style={styles.title}>Talleres disponibles para ti</Text>

        {loading ? (
          <Text style={styles.loadingText}>Cargando talleres...</Text>
        ) : (
          hasWorkshops ? (
            workshops.map((activity, index) => (
              <ActivityCard
                key={index}
                activity={activity}
                onPressBlue={() => {
                  setSelectedActivityId(activity.id);
                  setShowModal(true);
                }}
                textBlue="Inscribirse"
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay talleres disponibles en este momento</Text>
              <Text style={styles.emptySubtext}>Por favor revisa más tarde</Text>

              <TouchableOpacity
                style={styles.refreshButton}
                onPress={loadData}
              >
                <Text style={styles.refreshText}>Reintentar</Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </ScrollView>

      {showModal && (
        <View style={[ModalStyles.overlay, styles.cover]}>
          <TouchableOpacity
            style={ModalStyles.overlayTouchable}
            activeOpacity={1}
            onPress={() => setShowModal(false)}
          />

          <View style={[ModalStyles.container, {
            maxHeight: height * 0.7,
            width: width * 0.9
          }]}>



            <View style={ModalStyles.content}>
              <Inscription
                activityId={selectedActivityId}
                onCancel={() => !isRegistering && setShowModal(false)}
                onConfirm={handleRegistration}
                isProcessing={isRegistering}
              />
            </View>
          </View>
        </View>
      )}
      <SafeAreaView>
        <MessageModal
          show={showNotification}
          type={modalType}
          message={modalMessage}
          onClose={() => setShowNotification(false)}
        />
      </SafeAreaView>






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
    paddingTop: 10,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    paddingHorizontal: 16,
    color: '#333',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
  }
});
