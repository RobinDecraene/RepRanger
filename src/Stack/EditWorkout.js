import React, { useState, useCallback } from 'react';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View, Image, Alert } from 'react-native';
import { P } from '../../Components/Text';
import { Button } from '../../Components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import { Title } from '../../Components/Title';
import { firebase } from '../../Firebase';

const EditWorkout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, myExercises = [], id } = route.params;

  const [exerciseList, setExerciseList] = useState(myExercises);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
          console.error('User not authenticated');
          return;
        }

        const userRef = firebase.firestore().collection('users').doc(currentUser.uid).collection('saved_workouts').doc(id);
        const doc = await userRef.get();
        if (doc.exists) {
          const exerciseRefs = doc.data().exercisesSaved || [];

          const exercisesData = await Promise.all(
            exerciseRefs.map(async (ref) => {
              const exerciseDoc = await ref.get();
              return { id: ref.id, ...exerciseDoc.data() };
            })
          );

          setExerciseList(exercisesData);
        } else {
          console.error('No such document!');
        }
      };

      fetchData();
      
    }, [id])
  );

  const removeExercise = async (workoutId, exerciseRef) => {
    if (exerciseList.length <= 4) {
      alert('Je moet minstens 4 oefeningen hebben in je workout.');
      return;
    }

    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      console.error('User not authenticated');
      return;
    }

    const userRef = firebase.firestore().collection('users').doc(currentUser.uid).collection('saved_workouts').doc(workoutId);

    try {
      const exerciseDocRef = firebase.firestore().doc(`exercises/${exerciseRef}`);
      await userRef.update({
        exercisesSaved: firebase.firestore.FieldValue.arrayRemove(exerciseDocRef)
      });

      const updatedExerciseList = exerciseList.filter(exercise => exercise.id !== exerciseRef);
      setExerciseList(updatedExerciseList);
    } catch (error) {
      console.error('Error removing exercise:', error);
    }
  };

  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.icon}
        >
          <MaterialIcons name="keyboard-arrow-left" size={40} color="#4E598C" />
        </Pressable>

        <Title>{name}</Title>

        {exerciseList.map((exercise, index) => (
          <Card
            key={index}
            style={styles.card}>
              <Image
                style={styles.exercisesImg}
                source={{ uri: `https://firebasestorage.googleapis.com/v0/b/repranger-b8691.appspot.com/o/exercises%2F${exercise.image}.png?alt=media`}}
              />

              <P style={styles.cardName}>{exercise.name}</P>

              <Pressable onPress={() => removeExercise(id, exercise.id)}>
                <MaterialCommunityIcons name="delete" color="#4E598C" size={25} />
              </Pressable>
          </Card>
        ))}

        <Button
          onPress={() => {
            if (exerciseList.length >= 8) {
              alert('Je kan niet meer dan 8 oefeningne hebben in je workout');
            } else {
              navigation.navigate('Exercises', { id: id });
            }
          }}
          style={styles.button}
        >
          + Nieuwe oefening
        </Button>
      </View>
    </ScrollView>
  );
}


export default EditWorkout;

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
  }
});
