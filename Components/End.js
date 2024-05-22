import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Title } from './Title';
import { P } from './Text';
import { Card } from './Card';
import { Button } from './Button';

const End = ({ elapsedTime, handleStopWorkout }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Image style={styles.ranger} source={require('../assets/images/ranger-hands-up.png')} />
      <Title>Goed gedaan</Title>
      <P>Je hebt een volledige workout gedaan!</P>

      <Card style={styles.numbersCard}>
        <View style={styles.numbers}>
          <P>6</P>
          <P>Oef</P>
        </View>
        <View style={styles.numbers}>
          <P>300</P>
          <P>Cal</P>
        </View>
        <View style={styles.numbers}>
          <P>{formatTime(elapsedTime)}</P>
          <P>Min</P>
        </View>
      </Card>

      <Button onPress={handleStopWorkout}>Mijn workouts</Button>
    </View>
  );
};

export default End;

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#fff',
    width: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  title: {
    alignItems: 'center',
    marginTop: 25
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
  numbers: {
    alignItems: 'center'
  },
  numbersCard: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    marginTop: 20
  },
});