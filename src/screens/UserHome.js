import React, {useState, useEffect}from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { getUserProfile, getWorkshopsForUser } from '../config/Api';
import { Spacing } from '../config/Styles';
import CustomHeader from '../components/CustomHeader';
import ActivityCard from '../components/ActivityCard';


export default function UserHome({ navigation }) {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const user = await getUserProfile();
      const workshopsData = await getWorkshopsForUser(user.userId);
      {/*showMessage('loading', 'Cargando talleres.');*/ }

      if (workshopsData.type === 'SUCCESS') {
        {/** setShowMessageModal(false);*/ }
        setWorkshops(workshopsData.result);
      }
    } catch (error) {
      {/**showMessage('error', 'Error al cargar los talleres') */ };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  return (
    <View style={styles.container}>

      <CustomHeader/>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Talleres disponibles para ti</Text>

        {loading ? (
          <Text>Cargando talleres...</Text>
        ) : (
          workshops.map((activity, index) => (
            <ActivityCard
              key={index}
              activity={activity}
              onPressBlue={() => setShowInscriptionModal(true)}
              textBlue="Inscribirse"
            />
          ))
        )}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  scrollView: {
    padding: Spacing.padding.large
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});