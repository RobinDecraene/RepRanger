import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '../../Firebase';

import { Image, Pressable, StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native';
import { Title } from '../../Components/Title';
import { Card } from '../../Components/Card';
import { SmallTitle } from '../../Components/SmallTitle';
import { SmallText } from '../../Components/SmallText';
import { P } from '../../Components/Text';
import { Button, ButtonLink } from '../../Components/Button';

const Workout = () => {
  const navigation = useNavigation();
  const [myWorkoutData, setMyWorkoutData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const db = firebase.firestore();
      const userRef = db.collection('users').doc(currentUser.uid);

      try {
        const savedWorkoutCollection = await userRef.collection('saved_workouts').get();
        const myWorkoutData = await Promise.all(savedWorkoutCollection.docs.map(async doc => {
          const workoutId = doc.id;
          const workoutData = doc.data();

          const workoutDoc = await db.collection('workouts').doc(workoutId).get();
          const workouts = workoutDoc.data();

          const muscleGroupRef = workoutDoc.data().muscle_group;
          let muscleGroupName = 'Unknown Muscle Group';
          if (muscleGroupRef) {
            const muscleGroupDoc = await muscleGroupRef.get();
            muscleGroupName = muscleGroupDoc.exists ? muscleGroupDoc.data().name : 'Unknown Muscle Group';
          }

          const exercisesPromises = (workoutData.exercisesSaved || []).map(async exerciseRef => {
            if (exerciseRef && typeof exerciseRef.get === 'function') {
              const exerciseDoc = await exerciseRef.get();
              return { id: exerciseDoc.id, ...exerciseDoc.data() };
            }
            return null;
          });

          const exercises = (await Promise.all(exercisesPromises)).filter(Boolean);

          return { id: workoutId, workout: workoutData, exercises, workouts, muscleGroupName };
        }));

        setMyWorkoutData(myWorkoutData);
      } catch (error) {
        console.log('Error getting document:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const removeWorkout = async (workoutId) => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      console.error('User not authenticated');
      return;
    }

    const userRef = firebase.firestore().collection('users').doc(currentUser.uid).collection('saved_workouts').doc(workoutId);

    try {
      await userRef.delete();
      setMyWorkoutData(prevWorkouts => prevWorkouts.filter(workout => workout.id !== workoutId));
    } catch (error) {
      console.error('Error removing workout:', error);
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
        <Title>Mijn workouts</Title>
        <Pressable
          onPress={() => navigation.navigate('NiewWorkout')}
          style={styles.icon}
        >
          <MaterialCommunityIcons name="plus-circle" color='#4E598C' size={30} />
        </Pressable>

        {myWorkoutData.length === 0 ? (
          <Card style={styles.noWorkout}>
            <P>Het ziet er naar uit dat je nog geen workout hebt opgelsaan.</P>
            <ButtonLink onPress={() => navigation.navigate('NiewWorkout')}>Voeg een toe!</ButtonLink>
            
            <Image
              style={styles.ranger}
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/repranger-b8691.appspot.com/o/ranger%2Franger-head.png?alt=media' }}
            />
          </Card>

        ) : (
          myWorkoutData.map((workout, index) => (
            <Card
              key={index}
              onPress={() => navigation.navigate('DetailWorkout', { id: workout.id, name: workout.workouts.name, exercises: workout.exercises, source: 'Workout', workout: workout })}
            >
              <Image
                style={styles.exercisesImg}
                source={{ uri: `https://firebasestorage.googleapis.com/v0/b/repranger-b8691.appspot.com/o/big_exercises%2F${workout.workouts.image}.png?alt=media`}}
              />
              <View style={styles.cardInfo}>
                <View>
                  <SmallTitle style={styles.cardInfoTitle}>{workout.workouts.name}</SmallTitle>
                  <SmallText>{workout.muscleGroupName}</SmallText>
                </View>
                <Pressable onPress={() => removeWorkout(workout.id)}>
                  <MaterialCommunityIcons name="delete" color='#4E598C' size={30} />
                </Pressable>
              </View>
            </Card>
          ))
        )}
      </View>
    </ScrollView>
  );
}

export default Workout;

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#FAFAFC',
    width: '100%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    backgroundColor: '#FAFAFC',
    marginBottom: 40
  },
  icon: {
    position: 'absolute',
    top: 55,
    right: 20
  },
  link: {
    height: 190,
    marginBottom: 10
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(235, 236, 242, 0.5)',
    position: 'absolute',
    width: '100%',
    bottom: 10,
    left: 15,
  },
  cardInfoTitle: {
    marginBottom: 0
  },
  exercisesImg: {
    width: 300,
    height: 160,
    resizeMode: 'contain'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  noWorkout: {
    width: '100%',
    paddingBottom: 50,

  },
  ranger: {
    position: 'absolute',
    width: 100,
    height: 100,
    resizeMode: 'contain',
    left: -5,
    bottom: -50
  },
});
