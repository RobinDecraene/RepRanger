import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { firebase } from '../../Firebase';

import { Pressable, StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import { P } from '../../Components/Text';
import { Button } from '../../Components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import { Title } from '../../Components/Title';

const DetailWorkout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [workoutData, setWorkoutData] = useState({});

  const fetchWorkoutData = async () => {
    const db = firebase.firestore();
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const userRef = db.collection('users').doc(currentUser.uid);
        const savedWorkoutRef = userRef.collection('saved_workouts').doc(id);
        const savedWorkoutDoc = await savedWorkoutRef.get();
        const workoutData = savedWorkoutDoc.data();

        const workoutDoc = await db.collection('workouts').doc(id).get();
        const workoutDetails = workoutDoc.data();

        const exercisesPromises = (workoutData.exercisesSaved || []).map(async exerciseRef => {
          const exerciseDoc = await exerciseRef.get();
          return exerciseDoc.data();
        });

        const exercises = await Promise.all(exercisesPromises);

        setWorkoutData({ ...workoutDetails, exercises });
      }
    } catch (error) {
      console.error('Error fetching workout document:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkoutData();
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      fetchWorkoutData();
    }, [id])
  );

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

        <Title>{workoutData.name}</Title>

        <Pressable
          onPress={() => navigation.navigate('EditWorkout', { myExercises: workoutData.exercises, id: id, name: workoutData.name })}
          style={styles.iconRight}
        >
          <MaterialCommunityIcons name="cog" color='#4E598C' size={30} />
        </Pressable>

        {workoutData.exercises && workoutData.exercises.map((exercise, index) => (
          <Card
            key={index}
            onPress={() => navigation.navigate('DetailExercise', { exercise: workoutData.exercises })}
            style={styles.card}>
            <Image
              style={styles.exercisesImg}
              source={{ uri: `https://firebasestorage.googleapis.com/v0/b/repranger-b8691.appspot.com/o/exercises%2F${exercise.image}.png?alt=media` }}
            />

            <P style={styles.cardName}>{exercise.name}</P>

            <MaterialIcons name="keyboard-arrow-right" size={35} color="#4E598C" />
          </Card>
        ))}

        <Button
          onPress={() => navigation.navigate('StartWorkout', { exercises: workoutData.exercises, workout: workoutData })}
          style={styles.button}
        >
          Start workout
        </Button>

      </View>
    </ScrollView>
  );
}

export default DetailWorkout;

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
