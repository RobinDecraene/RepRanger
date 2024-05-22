import React, { useState, useRef, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import { firebase } from '../../Firebase';

import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { P } from '../../Components/Text';
import { Card } from '../../Components/Card';
import { SmallTitle } from '../../Components/SmallTitle';
import { SmallText } from '../../Components/SmallText';
import { Title } from '../../Components/Title';
import { Set, SetPressed } from '../../Components/Sets';
import { ButtonSecondary } from '../../Components/Button';
import { TextInput } from 'react-native-gesture-handler';
import End from '../../Components/End';
import Halfway from '../../Components/Halfway';

const StartWorkout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { exercises, workout } = route.params;

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedSets, setSelectedSets] = useState(2);
  const [workoutData, setWorkoutData] = useState([]);
  const [currentExerciseData, setCurrentExerciseData] = useState([]);
  const intervalIdRef = useRef(null);
  const scrollViewRef = useRef(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    if (isTimerRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isTimerRunning]);

  useEffect(() => {
    setIsTimerRunning(true);
  }, []);

  const handleNextExercise = () => {
    const currentExercise = exercises[currentExerciseIndex];
    
    setWorkoutData(prevData => [
      ...prevData,
      { exerciseName: currentExercise.name, sets: currentExerciseData }
    ]);

    setCurrentExerciseIndex(prevIndex => prevIndex + 1);
    setCurrentExerciseData([]);
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  const handleStopWorkout = async () => {
    setIsTimerRunning(false);

    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      console.error('User not authenticated');
      return;
    }

    const userRef = firebase.firestore().collection('users').doc(currentUser.uid).collection('history');

    const finalWorkoutData = [
      ...workoutData,
      { exerciseName: exercises[currentExerciseIndex]?.name, sets: currentExerciseData }
    ].filter(item => item.exerciseName);

    try {
      await userRef.add({
        workout: firebase.firestore().doc(`workouts/${workout.id}`),
        exercisesArray: finalWorkoutData,
        elapsedTime,
        date: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log('Workout added to history');
      navigation.navigate('Workout');
    } catch (error) {
      console.error('Error adding workout to history:', error);
    }
  };

  const handleSetDataChange = (setIndex, field, value) => {
    setCurrentExerciseData(prevData => {
      const newData = [...prevData];
      if (!newData[setIndex]) {
        newData[setIndex] = { reps: '', kg: '' };
      }
      newData[setIndex][field] = value;
      return newData;
    });
  };

  const isEnd = currentExerciseIndex === exercises.length;
  const currentExercise = exercises[currentExerciseIndex];

  return (
    <ScrollView ref={scrollViewRef} style={styles.base}>
      {isEnd ? (
        <End elapsedTime={elapsedTime} handleStopWorkout={handleStopWorkout} />
      ) : (
        <View style={styles.container}>
          {currentExercise && (
            <>
              <View style={styles.title}>
                <Title>{currentExercise.name}</Title>
                <P>{formatTime(elapsedTime)}</P>
              </View>
              <Card style={styles.imagesCard}>
                <Image style={styles.exercisesImg} source={require('../../assets/images/squat-up.png')} />
                <Image style={styles.exercisesImgSmaller} source={require('../../assets/images/squat-down.png')} />
              </Card>

              <View style={styles.setsRow}>
                {[2, 3, 4].map((sets, index) => (
                  selectedSets === sets ? (
                    <SetPressed key={index} onPress={() => setSelectedSets(sets)}>{`${sets} sets`}</SetPressed>
                  ) : (
                    <Set key={index} onPress={() => setSelectedSets(sets)}>{`${sets} sets`}</Set>
                  )
                ))}
              </View>

              {Array.from({ length: selectedSets }).map((_, index) => (
                <Card key={index} style={styles.setCard}>
                  <SmallTitle>{`Set ${index + 1}`}</SmallTitle>
                  <View style={styles.setCardInfo}>
                    <View style={styles.setCardInputRow}>
                      <RNPickerSelect
                        style={pickerSelectStyles}
                        placeholder={{ label: ' ', value: null }}
                        onValueChange={(value) => handleSetDataChange(index, 'reps', value)}
                        items={[
                          { label: '8', value: '8' },
                          { label: '9', value: '9' },
                          { label: '10', value: '10' },
                          { label: '11', value: '11' },
                          { label: '12', value: '12' },
                        ]}
                      />
                      <P style={styles.setCardMargin}>Reps</P>
                    </View>
                    <View style={styles.setCardInputRow}>
                      <TextInput 
                        style={styles.setCardInput} 
                        keyboardType='numeric'
                        onChangeText={(value) => handleSetDataChange(index, 'kg', value)}
                      />
                      <P>kg</P>
                    </View>
                  </View>
                </Card>
              ))}

              <Card onPress={handleNextExercise} style={styles.nextExercises}>
                <Image style={styles.nextExercisesImg} source={require('../../assets/images/squat-up.png')} />
                <View>
                  <P>Volgende oefening</P>
                  {exercises[currentExerciseIndex + 1] && <SmallText>{exercises[currentExerciseIndex + 1].name}</SmallText>}
                </View>
                <MaterialCommunityIcons name="arrow-right" color="#B0B5CB" size={25} />
              </Card>

              <ButtonSecondary style={styles.margin} onPress={handleStopWorkout}>
                Stop Workout
              </ButtonSecondary>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default StartWorkout;

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
  imagesCard: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginBottom: 40
  },
  exercisesImg: {
    width: 140,
    height: 180,
    resizeMode: 'contain'
  },
  exercisesImgSmaller: {
    width: 140,
    height: 120,
    resizeMode: 'contain'
  },
  margin: {
    marginBottom: 20
  },
  setsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20
  },
  setCard: {
    alignItems: 'flex-start',
    marginBottom: 10
  },
  setCardInfo: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10
  },
  setCardInputRow: {
    flexDirection: 'row',
    width: '40%',
  },
  setCardInput: {
    backgroundColor: '#C4C7D8',
    color: '#191D2F',
    marginLeft: 10,
    alignItems:'center',
    justifyContent:'center',
    textAlign: 'center',
    borderRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginRight: 10,
    padding: 5,
    paddingLeft: 35,
    paddingRight: 35
  },
  setCardMargin: {
    marginLeft: 10
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#C4C7D8',
    color: '#191D2F',
    width: '100%',
    alignItems:'center',
    justifyContent:'center',
    textAlign: 'center',
    borderRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 5,
    paddingLeft: 35,
    paddingRight: 35
  },
  inputAndroid: {
    backgroundColor: '#C4C7D8',
    color: '#191D2F',
    width: '100%',
    alignItems:'center',
    justifyContent:'center',
    textAlign: 'center',
    borderRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 5,
    paddingLeft: 35,
    paddingRight: 35
  },
});