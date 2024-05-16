import { StyleSheet, View, Image, ScrollView } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { P } from '../../Components/Text';
import { Card } from '../../Components/Card';
import { SmallTitle } from '../../Components/SmallTitle';
import { SmallText } from '../../Components/SmallText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Title } from '../../Components/Title';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Set, SetPressed } from '../../Components/Sets';
import { Button, ButtonSecondary } from '../../Components/Button';

const StartWorkout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { exercises } = route.params;

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedSets, setSelectedSets] = useState(2);
  const intervalIdRef = useRef(null);
  const scrollViewRef = useRef(null);

  const handleNextExercise = () => {
    setCurrentExerciseIndex(prevIndex => prevIndex + 1);
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleStopWorkout = () => {
    setIsTimerRunning(false);
    navigation.navigate('DetailWorkout');
  };

  const halfwayIndex = Math.ceil(exercises.length / 2);
  const isHalfway = currentExerciseIndex === halfwayIndex;
  const isEnd = currentExerciseIndex === exercises.length + 1;
  const currentExercise = exercises[currentExerciseIndex - (currentExerciseIndex > halfwayIndex ? 1 : 0)];

  

  return (
    <ScrollView ref={scrollViewRef} style={styles.base}>
      
        {isEnd ? (
          <View style={styles.container}>
            <Image
              style={styles.ranger}
              source={require('../../assets/images/ranger-hands-up.png')}
            />
            <Title>Goed gedaan</Title>
            <P>Je hebt een volledige workout gedaan!</P>

            <Card style={styles.numbersCard}>
              <View style={styles.numbers}>
                <P>6</P>
                <SmallText>Oef</SmallText>
              </View>

              <View style={styles.numbers}>
                <P>300</P>
                <SmallText>Cal</SmallText>
              </View>

              <View style={styles.numbers}>
                <P>25:45</P>
                <SmallText>Min</SmallText>
              </View>
            </Card>

            <Button onPress={() => { handleStopWorkout(); navigation.navigate('Workout'); }}>Mijn workouts</Button>
          </View>
        ) : isHalfway ? (
          <View style={styles.container}>
            <View style={styles.title}>
              <Title>Halverwegen</Title>
              <P>{formatTime(elapsedTime)}</P>
            </View>
            <Image
              style={styles.ranger}
              source={require('../../assets/images/ranger.png')}
            />
            <P>Doe zo verder je bent er bijna!</P>
            <Card onPress={handleNextExercise} style={styles.nextExercises}>
              <Image
                style={styles.nextExercisesImg}
                source={require('../../assets/images/squat-up.png')}
              />
              <View>
                <P>Volgende oefening</P>
                {exercises[halfwayIndex] && (
                  <SmallText>{exercises[halfwayIndex].name}</SmallText>
                )}
              </View>
              <MaterialCommunityIcons name="arrow-right" color="#B0B5CB" size={25} />
            </Card>
            <ButtonSecondary style={styles.margin} onPress={() => { handleStopWorkout(); navigation.navigate('Workout'); }}>
              Stop Workout
            </ButtonSecondary>
          </View>
        ) : (
          <View style={styles.container}>
            {currentExercise && (
              <>
                <View style={styles.title}>
                  <Title>{currentExercise.name}</Title>
                  <P>{formatTime(elapsedTime)}</P>
                </View>
                <Card style={styles.imagesCard}>
                  <Image
                    style={styles.exercisesImg}
                    source={require('../../assets/images/squat-up.png')}
                  />
                  <Image
                    style={styles.exercisesImgSmaller}
                    source={require('../../assets/images/squat-down.png')}
                  />
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
                        <P>8 Reps</P>
                        <P>40 kg</P>
                      </View>
                    </Card>
                  ))}

                <Card onPress={handleNextExercise} style={styles.nextExercises}>
                  <Image
                    style={styles.nextExercisesImg}
                    source={require('../../assets/images/squat-up.png')}
                  />
                  <View>
                    <P>Volgende oefening</P>
                    {exercises[currentExerciseIndex + 1] && (
                      <SmallText>{exercises[currentExerciseIndex + 1].name}</SmallText>
                    )}
                  </View>
                  <MaterialCommunityIcons name="arrow-right" color="#B0B5CB" size={25} />
                </Card>

                <ButtonSecondary style={styles.margin} onPress={() => { handleStopWorkout(); navigation.navigate('Workout'); }}>
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
  ranger: {
    width: 120,
    height: 120,
    resizeMode: 'contain'
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
