import React, { useCallback, useState } from 'react';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { firebase } from '../../Firebase';

import { Pressable, StyleSheet, View, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Title } from '../../Components/Title';
import { Set, SetPressed } from '../../Components/Sets';
import { Card } from '../../Components/Card';
import { SmallText } from '../../Components/SmallText';
import { SmallTitle } from '../../Components/SmallTitle';

const Exercises = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [muscleData, setMuscleData] = useState([]);
  const [selectedMuscle, setSelectedMuscle] = useState('Alles');
  const [savedExercises, setSavedExercises] = useState([]);

  useFocusEffect(
    useCallback(() => {
    const fetchExercisesAndMuscles = async () => {
      try {
        const exercisesCollection = await firebase.firestore().collection('exercises').get();
        const exercisesData = await Promise.all(
          exercisesCollection.docs.map(async (doc) => {
            const data = doc.data();
            const muscleGroupDoc = await data.muscle_group.get();
            const muscleGroupName = muscleGroupDoc.data().name;
            return {
              id: doc.ref.id,
              ...data,
              muscleGroupName,
            };
          })
        );

        const muscleGroupsCollection = await firebase.firestore().collection('muscle_groups').get();
        const muscleGroupsData = muscleGroupsCollection.docs.map(doc => doc.data());

        setExercises(exercisesData);
        setMuscleData(muscleGroupsData);

        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
          const savedExercisesRef = userRef.collection('saved_workouts').doc(id);
          const savedDoc = await savedExercisesRef.get();

          if (savedDoc.exists) {
            setSavedExercises(savedDoc.data().exercisesSaved || []);
          }
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercisesAndMuscles();
  }, [id])
  );

  const toggleSavedExercise = async (exerciseId, isSaved) => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      console.error('User not authenticated');
      return;
    }
  
    const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
    const savedExercisesRef = userRef.collection('saved_workouts').doc(id);
  
    try {
      const savedDoc = await savedExercisesRef.get();
      const existingExercises = savedDoc.exists ? savedDoc.data().exercisesSaved || [] : [];
  
      const exerciseRef = firebase.firestore().collection('exercises').doc(exerciseId);
  
      let updatedExercises;
  
      if (isSaved) {
        updatedExercises = existingExercises.filter(ex => ex.id !== exerciseId);
      } else {
        updatedExercises = [...existingExercises, exerciseRef];
      }
  
      if (updatedExercises.length < 4 ) {
        Alert.alert(
          "Pas op",
          "Je moet minstens 4 oefeningen in je workout hebben."
        );
        return;
      }

      if ( updatedExercises.length > 8) {
        Alert.alert(
          "Pas op",
          "Je mag maximum 8 oefeningen in je workout hebben",
        );
        return;
      }
  
      if (isSaved) {
        await savedExercisesRef.update({ exercisesSaved: updatedExercises });
      } else {
        await savedExercisesRef.set({ exercisesSaved: updatedExercises }, { merge: true });
      }
  
      setExercises(prevExercises => prevExercises.map(exercise => {
        if (exercise.id === exerciseId) {
          return { ...exercise, saved: !isSaved };
        }
        return exercise;
      }));
  
      setSavedExercises(savedExercises => {
        if (isSaved) {
          return savedExercises.filter(ex => ex.id !== exerciseId);
        } else {
          return [...savedExercises, exerciseRef];
        }
      });
    } catch (error) {
      console.error('Error toggling saved exercise:', error);
    }
  };
  
  

  const handleFilterPress = (muscleName) => {
    setSelectedMuscle(muscleName === selectedMuscle ? 'Alles' : muscleName);
  };

  const filteredExercises = selectedMuscle === 'Alles'
    ? exercises
    : exercises.filter(exercise => exercise.muscleGroupName === selectedMuscle);

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

        <Title>Oefeningen</Title>

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

        <View style={styles.exercises}>
          {filteredExercises.map((exercise, index) => (
            <Card
              style={styles.card}
              key={index}
              onPress={() => navigation.navigate('DetailExercise', { exercise: exercise, source: 'Exercises', id: id })}
            >
              <Image
                style={styles.exercisesImg}
                source={{ uri: `https://firebasestorage.googleapis.com/v0/b/repranger-b8691.appspot.com/o/exercises%2F${exercise.image}.png?alt=media`}}
              />
              <View style={styles.cardInfo}>
                <SmallTitle style={styles.cardTitle}>{exercise.name}</SmallTitle>
                <View style={styles.cardHeart}>
                  <SmallText>{exercise.muscleGroupName}</SmallText>
                  <Pressable onPress={() => toggleSavedExercise(exercise.id, savedExercises.some(e => e.id === exercise.id))}>
                    <MaterialCommunityIcons name={savedExercises.some(e => e.id === exercise.id) ? "heart" : "heart-outline"} color='#4E598C' size={30} />
                  </Pressable>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default Exercises;

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
  exercises: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    position: 'absolute',
    top: 50,
    left: 20
  },
  setsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '99%',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20
  },
  card: {
    width: '48%',
    minHeight: 280,
    justifyContent: 'space-between'
  },
  exercisesImg: {
    width: 140,
    height: 150,
    resizeMode: 'contain'
  },
  cardInfo: {
    width: '100%',
  },
  cardTitle: {
    marginBottom: 0,
  },
  cardHeart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
