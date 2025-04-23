import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, fontSizes, Spacing } from '../config/Styles';
import CustomHeader from '../components/CustomHeader';
import ActivityCard from '../components/ActivityCard';
import { ScrollView } from 'react-native-gesture-handler';
import MessageModal from '../components/MessageModal';
import { useNavigation } from '@react-navigation/native';
import { getEventsForOwner, getworkshopsForOwner, getUserProfile, getUserInfo } from '../config/Api';

export default function CheckerHome() {
  const [showNotification, setShowNotification] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState('success');
  const [activities, setActivities] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const showMessage = (type, message) => {
    setModalType(type);
    setModalMessage(message);
    setShowNotification(true);
  };

  const loadData = async () => {
    try {
      showMessage('loading', 'Cargando actividades.');
      const profile = await getUserProfile();
      const user = await getUserInfo(profile.userId);
      const boss = user.result.sentByUser.id;
      const eventsData = await getEventsForOwner(boss);

      if (eventsData.type === 'SUCCESS') {
        setActivities(eventsData.result);
        setShowNotification(false); // Cierra el modal
      } else {
        showMessage('error', 'No se pudieron cargar las actividades');
      }
    } catch (error) {
      console.log(error);
      showMessage('error', 'Error al cargar las talleres');
    } finally {
      setLoading(false);
      setShowNotification(false);
    }
  };

  const loadWorkshops = async () => {
    try {
      showMessage('loading', 'Cargando actividades.');
      const profile = await getUserProfile();
      const user = await getUserInfo(profile.userId);
      const boss = user.result.sentByUser.id;
      const workshopData = await getworkshopsForOwner(boss);

      if (workshopData.type === 'SUCCESS') {
        setWorkshops(workshopData.result);
        setShowNotification(false); // Cierra el modal
      } else {
        showMessage('error', 'No se pudieron cargar las actividades');
      }
    } catch (error) {
      console.log(error);
      showMessage('error', 'Error al cargar las talleres');
    } finally {
      setLoading(false);
      setShowNotification(false);
    }
  };

  useEffect(() => {
    loadData();
    loadWorkshops();
  }, []);

  const handleRegistrationE = (activityId) => {
    navigation.navigate('RegistertoEvent', { activityId: activityId })
  }

  const handleRegistrationW = (activityId) => {
    navigation.navigate('RegistertoWorkshop', { activityId: activityId })
  }


  return (
    <View style={styles.container}>
      <CustomHeader />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
      >

        <Text style={styles.title}>Eventos de tu encargado</Text>

        {loading ? (
          <Text style={styles.loadingText}>Cargando eventos y talleres...</Text>
        ) : (
          activities.map((activity, index) => (
            <ActivityCard
              key={index}
              activity={activity}
              onPressBlue={() => handleRegistrationE(activity.id)}
              textBlue="Inscribir usuario"
            />
          ))
        )}


        <Text style={styles.title}>Talleres de tu encargado</Text>


        {loading ? (
          <Text style={styles.loadingText}>Cargando eventos y talleres...</Text>
        ) : (
          workshops.map((activity, index) => (
            <ActivityCard
              key={index}
              activity={activity}
              onPressBlue={() => handleRegistrationW(activity.id)}
              textBlue="Inscribir usuario"
            />
          ))
        )}

      </ScrollView>

      <MessageModal
        show={showNotification}
        message={modalMessage}
        onClose={() => setShowNotification(false)}
        type={modalType}
      />
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