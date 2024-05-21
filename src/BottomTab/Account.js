import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '../../Firebase';

import { Image, Pressable, StyleSheet, View, ActivityIndicator } from 'react-native';
import { P } from '../../Components/Text';
import { Button } from '../../Components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import { SmallText } from '../../Components/SmallText';
import { SmallTitle } from '../../Components/SmallTitle';


const Account = () => {
  const navigation = useNavigation();
  const [historyData, setHistoryData] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const db = firebase.firestore();
        const userRef = db.collection('users').doc(currentUser.uid);

        try {
          const userDoc = await userRef.get();
          if (userDoc.exists) {
            setUser(userDoc.data());
            const historyCollection = await userRef.collection('history').get();
            const historyData = await Promise.all(historyCollection.docs.map(async doc => {
              const historyItem = doc.data();
              const historyRef = historyItem.workout;
              
              if (historyRef && typeof historyRef.get === 'function') {
                const historyDoc = await historyRef.get();
                const workoutData = historyDoc.data();
                
                const exercisesPromises = workoutData.exercises.map(async exerciseRef => {
                  const exerciseDoc = await exerciseRef.get();
                  return exerciseDoc.data();
                });
                const exercises = await Promise.all(exercisesPromises);
  
                return { id: doc.id, ...historyItem, workout: workoutData, exercises };
              } else {
                console.error('Invalid workout reference');
                return null;
              }
            }));
            setHistoryData(historyData.filter(item => item !== null));
          } 
        } catch (error) {
          console.log('Error getting document:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate('Start');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4E598C" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.navigate('EditAccount')}
          style={styles.icon}
        >
          <MaterialCommunityIcons name="cog" color='#4E598C' size={30} />
        </Pressable>
      
        <Image
          style={styles.profileImg}
          source={require('../../assets/images/no-profil.png')}
        />
        {user && (
          <P>{`${user.firstName} ${user.lastName}`}</P>
        )}

        <Card style={styles.infoCard}>
          <View style={styles.infoCardText}>
            <P>5</P>
            <SmallText style={styles.orange}>Workout/week</SmallText>
          </View>

          <View style={styles.infoCardText}>
            <P>25:35</P>
            <SmallText style={styles.orange}>Gemiddelde tijd</SmallText>
          </View>
        </Card>

        <SmallTitle>Workout historiek</SmallTitle>
        {historyData
          .sort((a, b) => b.date - a.date)
          .map((history, index) => (
          <Card
            key={index}
            onPress={() => navigation.navigate('DetailHistory')}
            style={styles.card}
          >
            <Image
              style={styles.exercisesImg}
              source={require('../../assets/images/bench-press-up.png')}
            />
            <View>
              <P>{history.workout.name}</P>
              <View style={styles.cardInfo}>
                <SmallText>{history.exercises.length} oef</SmallText>
                <SmallText> cal</SmallText>
                <SmallText>{history.elapsedTime} min</SmallText>
              </View>
            </View>
          </Card>
        ))}

        <Button onPress={handleLogout}>Log uit</Button>
      </View>
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#fff',
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    marginBottom: 40,
  },
  profileImg: {
    height: null,
    aspectRatio: 1,
    width: '60%',
    borderRadius: 120,
    marginTop: 40,
    marginBottom: 20,
    borderColor: '#4E598C',
    borderWidth: 1,
  },
  card: {
    flexDirection: 'row',
  },
  exercisesImg: {
    width: 60,
    height: 80,
    resizeMode: 'contain',
    marginRight: 20,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FEEDD9',
    marginTop: 10,
    marginBottom: 20,
  },
  infoCardText: {
    alignItems: 'center',
  },
  orange: {
    color: '#FCAF58',
  },
  icon: {
    position: 'absolute',
    top: 55,
    right: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
