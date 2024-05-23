import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '../../Firebase';

import { Pressable, StyleSheet, View, Image, ScrollView } from 'react-native';
import { Title } from '../../Components/Title';
import { Set, SetPressed } from '../../Components/Sets';
import { Card } from '../../Components/Card';
import { SmallText } from '../../Components/SmallText';
import { SmallTitle } from '../../Components/SmallTitle';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [muscleData, setMuscleData] = useState([]);
  const [selectedMuscle, setSelectedMuscle] = useState('Alles');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchExercisesAndMuscles = async () => {
      try {
        // Fetch exercises
        const exercisesCollection = await firebase.firestore().collection('exercises').get();
        const exercisesData = await Promise.all(
          exercisesCollection.docs.map(async (doc) => {
            const data = doc.data();
            const muscleGroupDoc = await data.muscle_group.get();
            const muscleGroupName = muscleGroupDoc.data().name;
            return {
              id: doc.id,
              ...data,
              muscleGroupName,
            };
          })
        );

        // Fetch muscle groups
        const muscleGroupsCollection = await firebase.firestore().collection('muscle_groups').get();
        const muscleGroupsData = muscleGroupsCollection.docs.map(doc => doc.data());

        setExercises(exercisesData);
        setMuscleData(muscleGroupsData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchExercisesAndMuscles();
  }, []);

  const handleFilterPress = (muscleName) => {
    setSelectedMuscle(muscleName === selectedMuscle ? 'Alles' : muscleName);
  };

  const filteredExercises = selectedMuscle === 'Alles'
    ? exercises
    : exercises.filter(exercise => exercise.muscleGroupName === selectedMuscle);

  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.icon}
        >
          <MaterialCommunityIcons name="arrow-left" color='#4E598C' size={30} />
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
            >
              <Image
                style={styles.exercisesImg}
                source={require('../../assets/images/squat-up.png')}
              />
              <View style={styles.cardInfo}>
                <SmallTitle style={styles.cardTitle}>{exercise.name}</SmallTitle>
                <View style={styles.cardHeart}>
                  <SmallText>{exercise.muscleGroupName}</SmallText>
                  <MaterialCommunityIcons name="heart-outline" color='#4E598C' size={30} />
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
    top: 55,
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
    width: '48%'
  },
  exercisesImg: {
    width: 140,
    height: 160,
    resizeMode: 'contain'
  },
  cardInfo: {
    backgroundColor: 'rgba(235, 236, 242, 0.5)',
    position: 'absolute',
    width: '100%',
    bottom: 10,
    left: 15,
  },
  cardTitle: {
    marginBottom: 0
  },
  cardHeart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
