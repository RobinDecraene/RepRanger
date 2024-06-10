import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { firebase } from '../../Firebase';

import { Pressable, StyleSheet, View, Image } from 'react-native';
import { P } from '../../Components/Text';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import { Title } from '../../Components/Title';

const BaseDetailWorkout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const [workoutData, setWorkoutData] = useState({});

  useEffect(() => {
    const fetchWorkoutData = async () => {
      const db = firebase.firestore();
      try {
        const workoutRef = await db.collection('workouts').doc(id).get();
        const workoutDoc = workoutRef.data();
        
        const exerciseDataPromises = workoutDoc.exercises.map(async exerciseRef => {
          const exerciseSnapshot = await exerciseRef.get();
          return exerciseSnapshot.data();
        });
        
        const exerciseData = await Promise.all(exerciseDataPromises);
        
        setWorkoutData({ ...workoutDoc, exercises: exerciseData });
      } catch (error) {
        console.error('Error fetching workout document:', error);
      }
    };
    fetchWorkoutData();
  }, [id]);
  
  
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.icon}
        >
          <MaterialIcons name="keyboard-arrow-left" size={40} color="#4E598C" />
        </Pressable>

        <Title>{workoutData.name}</Title>

        <Pressable
          style={styles.iconRight}
        >
          <MaterialCommunityIcons name="heart" color='#4E598C' size={30} />
        </Pressable>

        {workoutData.exercises && workoutData.exercises.map((exercise, index) => (
          <Card
            key={index}
            onPress={() => navigation.navigate('DetailExercise' , { exercise: workoutData.exercises })}
            style={styles.card}>
              <Image
                style={styles.exercisesImg}
                source={{ uri: `https://firebasestorage.googleapis.com/v0/b/repranger-b8691.appspot.com/o/exercises%2F${exercise.image}.png?alt=media`}}
              />

              <P style={styles.cardName}>{exercise.name}</P>

              <MaterialIcons name="keyboard-arrow-right" size={35} color="#4E598C" />
          </Card>
        ))}

      </View>
    </ScrollView>
  );
}


export default BaseDetailWorkout

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
