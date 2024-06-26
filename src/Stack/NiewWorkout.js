import React, { useState, useCallback  } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { firebase } from '../../Firebase';

import { View, StyleSheet, ScrollView, Image, ActivityIndicator, Pressable, Alert } from 'react-native';
import { Title } from '../../Components/Title';
import { Card } from '../../Components/Card';
import { SmallTitle } from '../../Components/SmallTitle';
import { SmallText } from '../../Components/SmallText';
import { Set, SetPressed } from '../../Components/Sets';

const NiewWorkout = () => {
  const navigation = useNavigation();
  const [workoutData, setWorkoutData] = useState([]);
  const [muscleData, setMuscleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMuscle, setSelectedMuscle] = useState('Alles');

  useFocusEffect(
    useCallback(() => {
    const fetchWorkout = async () => {
      try {
        const workoutSnapshot = await firebase.firestore().collection('workouts').get();
    
        const workoutData = await Promise.all(workoutSnapshot.docs.map(async doc => {
          const workout = doc.data();
          const workoutId = doc.id;
          const muscleGroupRef = workout.muscle_group;
          const muscleGroupDoc = await muscleGroupRef.get();
          const muscleGroupData = muscleGroupDoc.data();
    
          const currentUser = firebase.auth().currentUser;
          let isSaved = false;
          if (currentUser) {
            const savedWorkoutRef = await firebase.firestore().collection('users').doc(currentUser.uid).collection('saved_workouts').doc(workoutId).get();
            isSaved = savedWorkoutRef.exists;
          }
    
          const exercisesPromises = workout.exercises.map(async exerciseRef => {
            const exerciseDoc = await exerciseRef.get();
            return { id: exerciseDoc.id, ...exerciseDoc.data() };
          });
    
          const exercises = await Promise.all(exercisesPromises);
    
          return { ...workout, id: workoutId, muscle_group: muscleGroupData, exercises, saved_workout: isSaved };
        }));
    
        setWorkoutData(workoutData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const muscleGroupsRef = firebase.firestore().collection('muscle_groups');
    const unsubscribe = muscleGroupsRef.onSnapshot(snapshot => {
      const muscleData = snapshot.docs.map(doc => doc.data());
      setMuscleData(muscleData);
    });

    fetchWorkout();

    return () => unsubscribe();
  }, [])
  );

  const handleFilterPress = (muscleName) => {
    setSelectedMuscle(muscleName === selectedMuscle ? 'Alles' : muscleName);
  };

  const deleteWorkout = async (workoutId) => {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      try {
        const userRef = db.collection('users').doc(currentUser.uid).collection('saved_workouts').doc(workoutId);
        await userRef.delete();
        setWorkoutData(prevWorkoutData => prevWorkoutData.map(workout => {
          if (workout.id === workoutId) {
            return { ...workout, saved_workout: false };
          }
          return workout;
        }));
      } catch (error) {
        console.error('Error deleting saved workout:', error);
      }
    }
  };
  

  const toggleSavedWorkout = async (workoutId, isSaved, exercises) => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      console.error('User not authenticated');
      return;
    }
  
    const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
    const savedWorkoutsRef = userRef.collection('saved_workouts').doc(workoutId);
  
    try {
      if (isSaved) {
        Alert.alert(
          "Verwijder Workout",
          "Weet je zeker dat je deze workout wilt verwijderen?",
          [
            {
              text: "Annuleren",
              style: "cancel"
            },
            { text: "Verwijder", onPress: () => deleteWorkout(workoutId) }
          ],
          { cancelable: false }
        );
      } else {
        const workoutDocRef = firebase.firestore().doc(`workouts/${workoutId}`);
        const exerciseRefs = exercises.map(exercise => firebase.firestore().doc(`exercises/${exercise.id}`));
        const savedWorkoutData = {
          workout: workoutDocRef,
          exercisesSaved: exerciseRefs
        };
        await savedWorkoutsRef.set(savedWorkoutData);
        setWorkoutData(prevWorkoutData => prevWorkoutData.map(workout => {
          if (workout.id === workoutId) {
            return { ...workout, saved_workout: true };
          }
          return workout;
        }));
      }
    } catch (error) {
      console.error('Error toggling saved workout:', error);
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
          onPress={() => navigation.goBack()}
          style={styles.icon}
        >
          <MaterialIcons name="keyboard-arrow-left" size={40} color="#4E598C" />
        </Pressable>

        <Title>Alle workouts</Title>
        <View style={styles.setsRow}>
          {muscleData
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((muscle, index) => (
              muscle.name === selectedMuscle ? (
                <SetPressed
                  key={index}
                  onPress={() => handleFilterPress(muscle.name)}
                >
                  {muscle.name}
                </SetPressed>
              ) : (
                <Set
                  key={index}
                  onPress={() => handleFilterPress(muscle.name)}
                >
                  {muscle.name}
                </Set>
              )
            ))}
        </View>

        {workoutData.map((workout, index) => {
          if (selectedMuscle === 'Alles' || workout.muscle_group.name === selectedMuscle) {
            const isSaved = workout.saved_workout;
            return (
              <Card
                key={index}
                onPress={() => navigation.navigate('BaseDetailWorkout', { id: workout.id })}
              >
                <View style={styles.images}>
                  <Image
                    style={styles.exercisesImg}
                    source={{ uri: `https://firebasestorage.googleapis.com/v0/b/repranger-b8691.appspot.com/o/big_exercises%2F${workout.image}.png?alt=media`}}
                  />
                </View>

                <View style={styles.cardInfo}>
                  <View>
                    <SmallTitle style={styles.cardInfoTitle}>{workout.name}</SmallTitle>
                    <SmallText>{workout.muscle_group.name}</SmallText>
                  </View>

                  <Pressable onPress={() => toggleSavedWorkout(workout.id, isSaved, workout.exercises)}>
                    <MaterialCommunityIcons name={isSaved ? "heart" : "heart-outline"} color='#4E598C' size={30} />
                  </Pressable>



                </View>
              </Card>
            );
          }
          return null;
        })}
      </View>
    </ScrollView>
  );
}

export default NiewWorkout

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
    top: 50,
    left: 20
  },
  setsRow: {
    flexDirection: 'row',
    alignItems: 'center ',
    width: '99%',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20
  },
  margin: {
    marginBottom: 20
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
  images: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'baseline',
    width: '100%',
    justifyContent: 'space-between'
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
  }
});
