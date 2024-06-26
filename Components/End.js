import React from 'react';

import { StyleSheet, View, Image } from 'react-native';
import { Title } from './Title';
import { P } from './Text';
import { Card } from './Card';
import { Button } from './Button';
import { SmallText } from './SmallText';

const End = ({ elapsedTime, handleEndWorkout, exercises }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.ranger}
        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/repranger-b8691.appspot.com/o/ranger%2Franger-hands-up.png?alt=media' }}
        />
      <Title>Goed gedaan</Title>
      <P>Je hebt een volledige workout gedaan!</P>

      <Card style={styles.numbersCard}>
        <View style={styles.numbers}>
          <P>{exercises.length}</P>
          <SmallText>Oef</SmallText>
        </View>
        <View style={styles.numbers}>
          <P>{formatTime(elapsedTime)}</P>
          <SmallText>Min</SmallText>
        </View>
      </Card>

      <Button onPress={handleEndWorkout}>Mijn workouts</Button>
    </View>
  );
};

export default End;

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
    justifyContent: 'space-around',
    marginBottom: 40,
    marginTop: 20
  },
});
