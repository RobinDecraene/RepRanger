import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '../../Firebase';

import { Pressable, StyleSheet, View, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from '../../Components/Title';
import { Card } from '../../Components/Card';
import { P } from '../../Components/Text';
import { SmallText } from '../../Components/SmallText';
import { SmallTitle } from '../../Components/SmallTitle';

const DetailHistory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { history, workout, exercises } = route.params;

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

  const confirmDeleteWorkout = () => {
    Alert.alert(
      "Verwijder Workout",
      "Weet je zeker dat je deze workout wilt verwijderen uit je geschiedenis?",
      [
        {
          text: "Annuleren",
          style: "cancel"
        },
        { text: "Verwijder", onPress: () => deleteWorkout() }
      ],
      { cancelable: false }
    );
  };

  const deleteWorkout = async () => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      console.error('User not authenticated');
      return;
    }

    const userRef = firebase.firestore().collection('users').doc(currentUser.uid).collection('history').doc(history.id);

    try {
      await userRef.delete();
      navigation.goBack();
    } catch (error) {
      console.error('Error removing workout:', error);
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

        <Pressable
          onPress={confirmDeleteWorkout}
          style={styles.iconRight}
        >
          <MaterialCommunityIcons name="delete" color='#4E598C' size={30} />
        </Pressable>

        <View style={styles.title}>
          <Title style={styles.titleName}>{workout.name}</Title>
          <SmallText>{formatDate(history.date)}</SmallText>
        </View>

        <Card style={styles.numbersCard}>
          <View style={styles.numbers}>
            <P style={styles.orange}>{exercises.length}</P>
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
  iconRight: {
    position: 'absolute',
    top: 50,
    right: 20
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
