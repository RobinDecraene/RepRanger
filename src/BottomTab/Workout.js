import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '../../Firebase';

import { Image, Pressable, StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native';
import { Title } from '../../Components/Title';
import { Card } from '../../Components/Card';
import { SmallTitle } from '../../Components/SmallTitle';
import { SmallText } from '../../Components/SmallText';

const Workout = () => {
  const navigation = useNavigation();
  const [myWorkoutData, setMyWorkoutData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
            const workoutName = workoutDoc.exists ? workoutDoc.data().name : 'Unknown Workout';
            
            const muscleGroupRef = workoutDoc.data().muscle_group;
            let muscleGroupName = 'Unknown Muscle Group';
            if (muscleGroupRef) {
              const muscleGroupDoc = await muscleGroupRef.get();
              muscleGroupName = muscleGroupDoc.exists ? muscleGroupDoc.data().name : 'Unknown Muscle Group';
            }
  
            const exercisesPromises = workoutData.exercisesSaved.map(async exerciseRef => {
              const exerciseDoc = await exerciseRef.get();
              return { id: exerciseDoc.id, ...exerciseDoc.data() };
            });
            const exercises = await Promise.all(exercisesPromises);
  
            return { id: workoutId, workout: workoutData, exercises, workoutName, muscleGroupName };
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
  
    fetchUserData();
  }, []);
  
  

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

        {myWorkoutData.map((workout, index) => {
  console.log('Workout Data:', workout);
  
  return (
    <Card
      key={index}
      onPress={() => navigation.navigate('DetailWorkout', { id: workout.id, name: workout.workoutName, exercises: workout.exercises, source: 'Workout', workout: workout })}
    >

      <View style={styles.images}>
        <Image
          style={styles.exercisesImg}
          source={require('../../assets/images/squat-up.png')}
        />
        <Image
          style={styles.exercisesImgSmaller}
          source={require('../../assets/images/squat-down.png')}
        />
      </View>

      <View style={styles.cardInfo}>
        <View>
          <SmallTitle style={styles.cardInfoTitle}>{workout.workoutName}</SmallTitle>
          <SmallText>{workout.muscleGroupName}</SmallText>
        </View>
        <Pressable onPress={() => removeWorkout(workout.id)}>
          <MaterialCommunityIcons name="delete" color='#4E598C' size={30} />
        </Pressable>
      </View>
    </Card>
  );
})}



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
  images: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'baseline',
    width: '100%',
    justifyContent: 'space-between'
  },
  exercisesImg: {
    width: 140,
    height: 160,
    resizeMode: 'contain'
  },
  exercisesImgSmaller: {
    width: 140,
    height: 100,
    resizeMode: 'contain'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
