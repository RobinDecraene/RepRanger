import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
          <MaterialCommunityIcons name="arrow-left" color='#4E598C' size={30} />
        </Pressable>

        <View style={styles.title}>
          <Title>{workout.name}</Title>
          <SmallText>{formatDate(history.date)}</SmallText>
        </View>



        <Card style={styles.numbersCard}>
          <View style={styles.numbers}>
            <P>6</P>
            <SmallText style={styles.orange}>Oef</SmallText>
          </View>
          <View style={styles.numbers}>
            <P>300</P>
            <SmallText style={styles.orange}>Cal</SmallText>
          </View>
          <View style={styles.numbers}>
            <P>{formatTime(history.elapsedTime)}</P>
            <SmallText style={styles.orange}>Min</SmallText>
          </View>
        </Card>
        
        {history.exercisesArray.map((exercises, index) => (
        <Card key={index}>
          <View style={styles.exercise}>
            <Image
              style={styles.exerciseImg}
              source={require('../../assets/images/bench-press-up.png')}
            />
            <SmallTitle style={styles.exerciseTitle}>{exercises.exerciseName}</SmallTitle>
          </View>

          {exercises.sets.map((set, idx) => (
            <View style={styles.sets} key={idx}>
              <P>Set {idx + 1}</P>
              <P>{set.reps} x {set.kg}kg</P>
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
    marginBottom: 40
  },
  title: {
    marginTop: 25,
    marginBottom: 20,
    textAlign: 'center',
    width: '78%',
    alignItems: 'center'
  },
  icon: {
    position: 'absolute',
    top: 55,
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
    color: '#FCAF58',
  },
  exerciseImg: {
    width: 80,
    height: 100,
    resizeMode: 'contain'
  },
  exercise: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  exerciseTitle: {
    width: '65%',
    marginLeft: 25
  },
  sets: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  }
});
