import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '../../Firebase';

import { Pressable, StyleSheet, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from '../../Components/Title';
import { Set, SetPressed } from '../../Components/Sets';
import { Card } from '../../Components/Card';
import { SmallText } from '../../Components/SmallText';
import { SmallTitle } from '../../Components/SmallTitle';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const exercises = await firebase.firestore().collection('exercises').get();
        const exercisesData = exercises.docs.map(doc => doc.data());
        setExercises(exercisesData);
        console.log(exercisesData)

      } catch (error) {
        console.error('Error fetching exercises: ', error);
      }
    };

    fetchExercises();
  }, []);
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
          <SetPressed>All</SetPressed>
          <Set>Benen</Set>
          <Set>Armen</Set>
          <Set>Rug</Set>
        </View>

      <View style={styles.exercises}>
        {exercises.map((exercise, index) => (
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
                  <SmallText>Spiergroep</SmallText>
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

export default Exercises

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
    alignItems: 'center ',
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
    marginBottom: 5
  },
  cardHeart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
