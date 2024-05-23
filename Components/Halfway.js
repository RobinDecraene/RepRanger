import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Title } from './Title';
import { P } from './Text';
import { Card } from './Card';
import { ButtonSecondary } from './Button';

const Halfway = ({ elapsedTime, handleNextExercise, handleStopWorkout, halfwayExercise }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Title>Halverwegen</Title>
        <P>{formatTime(elapsedTime)}</P>
      </View>
      <Image style={styles.ranger} source={require('../assets/images/ranger.png')} />
      <P>Doe zo verder je bent er bijna!</P>
      <Card onPress={handleNextExercise} style={styles.nextExercises}>
        <Image style={styles.nextExercisesImg} source={require('../assets/images/squat-up.png')} />
        <View>
          <P>Volgende oefening</P>
        </View>
        <MaterialCommunityIcons name="arrow-right" color="#4E598C" size={25} />
      </Card>
      <ButtonSecondary style={styles.margin} onPress={handleStopWorkout}>
        Stop Workout
      </ButtonSecondary>
    </View>
  );
};

export default Halfway;

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
  },
  title: {
    alignItems: 'center',
    marginTop: 25
  },
  nextExercises: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  nextExercisesImg: {
    width: 60,
    height: 80,
    resizeMode: 'contain'
  },
  ranger: {
    width: 200,
    height: 400,
    resizeMode: 'contain',
    marginTop: 40
  },
  margin: {
    marginBottom: 20
  },
});

