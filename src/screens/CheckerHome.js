import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, fontSizes, Spacing } from '../config/Styles';
import CustomHeader from '../components/CustomHeader';
import ActivityCard from '../components/ActivityCard';
import { ScrollView } from 'react-native-gesture-handler';
import MessageModal from '../components/MessageModal';
import { getActivitiesForOwner, getUserProfile, getUserInfo } from '../config/Api';

export default function CheckerHome({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState('success');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivityId, setSelectedActivityId] = useState(null);

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
        console.log(workshopsData)
        setShowNotification(false);
        setActivities(workshopsData.result);
      }
    } catch (error) {
      console.log(error);
      showMessage('error', 'Error al cargar las talleres');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRegistration = () =>{
    
  }


  return (
    <View style={styles.container}>
      <CustomHeader />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={!showModal}>

        <Text style={styles.title}>Actividades de tu encargado</Text>

        {loading ? (
          <Text style={styles.loadingText}>Cargando eventos y talleres...</Text>
        ) : (
          activities.map((activity, index) => (
            <ActivityCard
              key={index}
              activity={activity}
              onPressBlue={handleRegistration}
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