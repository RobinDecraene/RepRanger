import React, { useState, useCallback  } from 'react';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { firebase } from '../../Firebase';

import { Pressable, StyleSheet, View, Image, Alert, ActivityIndicator } from 'react-native';
import { P } from '../../Components/Text';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import { Title } from '../../Components/Title';


const BaseDetailWorkout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const [loading, setLoading] = useState(true);
  const [workoutData, setWorkoutData] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  useFocusEffect(
    useCallback(() => {
    const fetchWorkout = async () => {
      try {
        const workoutDoc = await firebase.firestore().collection('workouts').doc(id).get();
        const workout = workoutDoc.data();

        const muscleGroupDoc = await workout.muscle_group.get();
        const muscleGroupData = muscleGroupDoc.data();
        workout.muscle_group = muscleGroupData;

        const exercisesPromises = workout.exercises.map(async exerciseRef => {
          const exerciseDoc = await exerciseRef.get();
          return { id: exerciseDoc.id, ...exerciseDoc.data() };
        });

        workout.exercises = await Promise.all(exercisesPromises);

        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          const savedWorkoutRef = await firebase.firestore().collection('users').doc(currentUser.uid).collection('saved_workouts').doc(id).get();
          setIsSaved(savedWorkoutRef.exists);
        }

        setWorkoutData(workout);
      } catch (error) {
        console.error('Error fetching workout:', error);
      }
    };

    fetchWorkout();
    setLoading(false);
  }, [id])
  );

  const saveWorkout = async () => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      console.error('User not authenticated');
      return;
    }

    try {
      const workoutDocRef = firebase.firestore().doc(`workouts/${id}`);
      const exerciseRefs = workoutData.exercises.map(exercise => firebase.firestore().doc(`exercises/${exercise.id}`));
      const savedWorkoutData = {
        workout: workoutDocRef,
        exercisesSaved: exerciseRefs
      };

      await firebase.firestore().collection('users').doc(currentUser.uid).collection('saved_workouts').doc(id).set(savedWorkoutData);
      setIsSaved(true);
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  const toggleSavedWorkout = async () => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      console.error('User not authenticated');
      return;
    }

    if (isSaved) {
      Alert.alert(
        "Verwijder Workout",
        "Weet je zeker dat je deze workout wilt verwijderen?",
        [
          {
            text: "Annuleren",
            style: "cancel"
          },
          {
            text: "Verwijder",
            onPress: async () => {
              try {
                await firebase.firestore().collection('users').doc(currentUser.uid).collection('saved_workouts').doc(id).delete();
                setIsSaved(false);
              } catch (error) {
                console.error('Error deleting saved workout:', error);
              }
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      saveWorkout();
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
        <Pressable onPress={() => navigation.goBack()} style={styles.icon}>
          <MaterialIcons name="keyboard-arrow-left" size={40} color="#4E598C" />
        </Pressable>

        <Title>{workoutData.name}</Title>

        <Pressable onPress={toggleSavedWorkout} style={styles.iconRight}>
          <MaterialCommunityIcons
            name={isSaved ? "heart" : "heart-outline"}
            color="#4E598C"
            size={30}
          />
        </Pressable>

        {workoutData.exercises && workoutData.exercises.map((exercise, index) => (
          <Card
            key={index}
            onPress={() => navigation.navigate('DetailExercise', { exercise: exercise })}
            style={styles.card}>
            <Image
              style={styles.exercisesImg}
              source={{ uri: `https://firebasestorage.googleapis.com/v0/b/repranger-b8691.appspot.com/o/exercises%2F${exercise.image}.png?alt=media` }}
            />
            <P style={styles.cardName}>{exercise.name}</P>
            <MaterialIcons name="keyboard-arrow-right" size={35} color="#4E598C" />
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

export default BaseDetailWorkout;

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#FAFAFC',
    width: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    marginBottom: 40
  },
  icon: {
    position: 'absolute',
    top: 50,
    left: 20
  },
  iconRight: {
    position: 'absolute',
    top: 55,
    right: 20
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardName: {
    width: '65%'
  },
  exercisesImg: {
    width: 60,
    height: 80,
    resizeMode: 'contain'
  },
  button: {
    marginTop: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
