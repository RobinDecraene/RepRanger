import React, { useCallback, useState } from 'react';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '../../Firebase';

import { StyleSheet, View, Image, Pressable, Alert } from 'react-native';
import { P } from '../../Components/Text';
import { Title } from '../../Components/Title';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import { SmallTitle } from '../../Components/SmallTitle';

const DetailExercise = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { exercise, source, id } = route.params;

  const [isSaved, setIsSaved] = useState(false);

  useFocusEffect(
  useCallback(() => {
    const fetchSavedExercises = async () => {
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) {
        console.error('User not authenticated');
        return;
      }

      try {
        const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
        const savedExercisesRef = userRef.collection('saved_workouts').doc(id);
        const savedDoc = await savedExercisesRef.get();
        const savedExercises = savedDoc.exists ? savedDoc.data().exercisesSaved || [] : [];

        setIsSaved(savedExercises.some(savedExercise => savedExercise.id === exercise.id));
      } catch (error) {
        console.error('Error fetching saved exercises:', error);
      }
    };

    fetchSavedExercises();
  }, [exercise.id, id])
  );

  const toggleSavedExercise = async () => {
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
      const exerciseRef = firebase.firestore().collection('exercises').doc(exercise.id);

      let updatedExercises;

      if (isSaved) {
        updatedExercises = existingExercises.filter(ex => ex.id !== exercise.id);
      } else {
        updatedExercises = [...existingExercises, exerciseRef];
      }

      if (updatedExercises.length < 4) {
        Alert.alert(
          "Pas op",
          "Je moet minstens 4 oefeningen in je workout hebben."
        );
        return;
      }

      if (updatedExercises.length > 8) {
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

      setIsSaved(!isSaved);
    } catch (error) {
      console.error('Error toggling saved exercise:', error);
    }
  };

  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Title style={styles.title}>{exercise.name}</Title>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.icon}
        >
          <MaterialIcons name="keyboard-arrow-left" size={40} color="#4E598C" />
        </Pressable>
        {source === 'Exercises' && (
          <Pressable style={styles.iconRight} onPress={toggleSavedExercise}>
            <MaterialCommunityIcons name={isSaved ? "heart" : "heart-outline"} color='#4E598C' size={30} />
          </Pressable>
        )}

        <Card style={styles.imagesCard}>
          <Image
            style={styles.exercisesImg}
            source={{ uri: `https://firebasestorage.googleapis.com/v0/b/repranger-b8691.appspot.com/o/big_exercises%2F${exercise.image_big}.png?alt=media` }}
          />
        </Card>

        <Card style={styles.exerciseInfo}>
          <SmallTitle>Hoe doe je de oefening?</SmallTitle>
          <P>{exercise.how_to}</P>
          <Image
            style={styles.ranger}
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/repranger-b8691.appspot.com/o/ranger%2Franger-head.png?alt=media' }}
          />
        </Card>

        <Card style={styles.alignLeft}>
          <SmallTitle>Gebruikte spieren</SmallTitle>
          <Image
            style={styles.muscles}
            source={{ uri: `https://firebasestorage.googleapis.com/v0/b/repranger-b8691.appspot.com/o/muscles%2F${exercise.image_muscle}.png?alt=media` }}
          />
        </Card>
      </View>
    </ScrollView>
  );
}

export default DetailExercise;

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
  title: {
    width: '80%',
    textAlign: 'center'
  },
  icon: {
    position: 'absolute',
    top: 50,
    left: 20
  },
  imagesCard: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  },
  exercisesImg: {
    width: 330,
    height: 180,
    resizeMode: 'contain'
  },
  muscles: {
    width: 310,
    height: 250,
    resizeMode: 'contain'
  },
  ranger: {
    position: 'absolute',
    width: 100,
    height: 100,
    resizeMode: 'contain',
    left: -5,
    bottom: -50
  },
  exerciseInfo: {
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: 50,
    alignItems: 'flex-start',
    marginBottom: 70
  },
  iconRight: {
    position: 'absolute',
    top: 55,
    right: 20
  },
});
