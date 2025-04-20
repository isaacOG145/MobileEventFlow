import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, fontSizes, Spacing } from '../config/Styles';
import CustomHeader from '../components/CustomHeader';
import ActivityCard from '../components/ActivityCard';
import { ScrollView } from 'react-native-gesture-handler';
import MessageModal from '../components/MessageModal';
import { useNavigation } from '@react-navigation/native';
import { getActivitiesForOwner, getUserProfile, getUserInfo } from '../config/Api';

export default function CheckerHome() {
  const [showNotification, setShowNotification] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState('success');
  const [activities, setActivities] = useState([]);
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
      const workshopsData = await getActivitiesForOwner(boss);

      if (workshopsData.type === 'SUCCESS') {
        setActivities(workshopsData.result);
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
  }, []);

  const handleRegistration = (activityId) => {
    navigation.navigate('Register', { activityId: activityId })
  }


  return (
    <View style={styles.container}>
      <CustomHeader />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        >

        <Text style={styles.title}>Actividades de tu encargado</Text>

        {loading ? (
          <Text style={styles.loadingText}>Cargando eventos y talleres...</Text>
        ) : (
          activities.map((activity, index) => (
            <ActivityCard
              key={index}
              activity={activity}
              onPressBlue={() => handleRegistration(activity.id)}
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