import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import { Pressable, Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from '../../Components/Title';
import { Card } from '../../Components/Card';
import { P } from '../../Components/Text';
import { SmallText } from '../../Components/SmallText';
import { SmallTitle } from '../../Components/SmallTitle';

const DetailHistory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { history, workout } = route.params;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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

        <View style={styles.title}>
          <Title style={styles.titleName}>{workout.name}</Title>
          <SmallText>{formatDate(history.date)}</SmallText>
        </View>



        <Card style={styles.numbersCard}>
          <View style={styles.numbers}>
            <P style={styles.orange}>6</P>
            <SmallText style={styles.orange}>Oef</SmallText>
          </View>
          <View style={styles.numbers}>
            <P style={styles.orange}>{formatTime(history.elapsedTime)}</P>
            <SmallText style={styles.orange}>Min</SmallText>
          </View>
        </Card>
        
        {history.exercisesArray.map((exercises, index) => (
        <Card key={index}>
          <SmallTitle>{exercises.exerciseName}</SmallTitle>

          {exercises.sets.map((set, idx) => (
            <View style={styles.sets} key={idx}>
              <SmallTitle style={styles.set}>Set {idx + 1}</SmallTitle>
              <View style={styles.setInfo}>
                <P>{set.reps} reps</P>
                <P>{set.kg}kg</P>
              </View>
             
            </View>
          ))}
         
        </Card>
      ))}
      </View>
    </ScrollView>
  );
}

export default DetailHistory

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
    marginTop: 25,
    marginBottom: 20,
    textAlign: 'center',
    width: '78%',
    alignItems: 'center'
  },
  titleName: {
    marginBottom: 0,
    marginTop: 0
  },
  icon: {
    position: 'absolute',
    top: 50,
    left: 20
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
    marginTop: 20,
    backgroundColor: '#FEEDD9'
  },
  orange: {
    color: '#C76A02',
  },
  sets: {
    marginBottom: 15,
  },
  set: {
    fontSize: 20,
    marginBottom: 5
  },
  setInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  }
});
