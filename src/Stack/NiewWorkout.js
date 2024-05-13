import { Image, Pressable, StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Title } from '../../Components/Title';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SmallTitle } from '../../Components/SmallTitle';
import { SmallText } from '../../Components/SmallText';
import { Set, SetPressed } from '../../Components/Sets';
import { firebase } from '../../Firebase';

const NiewWorkout = () => {
  const navigation = useNavigation();
  const [workoutData, setWorkoutData] = useState([]);
  const [muscleData, setMuscleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMuscle, setSelectedMuscle] = useState('Alles');

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const workout = await firebase.firestore().collection('workouts').get();
  
        const workoutData = await Promise.all(workout.docs.map(async doc => {
          const workout = doc.data();
          const muscleGroupRef = workout.muscle_group;
          const muscleGroupDoc = await muscleGroupRef.get();
          const muscleGroupData = muscleGroupDoc.data();

          const exercisesPromises = workout.exercises.map(async exerciseRef => {
            const exerciseDoc = await exerciseRef.get();
            return exerciseDoc.data();
          });
          
          const exercises = await Promise.all(exercisesPromises);

          return { ...workout, muscle_group: muscleGroupData, exercises };
        }));
  
        setWorkoutData(workoutData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const muscleGroupsRef = firebase.firestore().collection('muscle_groups');
    const unsubscribe = muscleGroupsRef.onSnapshot(snapshot => {
      const muscleData = snapshot.docs.map(doc => doc.data());
      setMuscleData(muscleData);
    });
  
    fetchWorkout();
  
    return () => unsubscribe();
  }, []);

  const handleFilterPress = (muscleName) => {
    setSelectedMuscle(muscleName === selectedMuscle ? 'All' : muscleName);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4E598C" />
      </View>
    );
  }


  return (
  <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.icon}
        >
          <MaterialCommunityIcons name="arrow-left" color='#4E598C' size={30} />
        </Pressable>

        <Title style={styles.title}>Alle workouts</Title>
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


        {workoutData.map((workout, index) => {
          if (selectedMuscle === 'Alles' || workout.muscle_group.name === selectedMuscle) {
            return (
              <Card
                key={index}
                onPress={() => navigation.navigate('DetailWorkout', {name: workout.name, exercises: workout.exercises})}
              >
                <View style={styles.images}>
                  <Image
                    style={styles.exercisesImg}
                    source={require('../../assets/images/squat-up.png')}
                  />
                  <Image
                    style={styles.exercisesImgSmaller}
                    source={require('../../assets/images/squat-down.png')}
                  />
                </View>
  
                <View style={styles.cardInfo}>
                  <View>
                    <SmallTitle>{workout.name}</SmallTitle>
                    <SmallText>{workout.muscle_group.name}</SmallText>
                  </View>
  
                  <MaterialCommunityIcons name="heart-outline" color='#4E598C' size={30} />
                </View>
              </Card>
            );
          }
          return null;
        })}
      </View>
    </ScrollView>
  );
}

export default NiewWorkout

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#fff',
    width: '100%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  title: {
    marginTop: 25,
    marginBottom: 20
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
  margin: {
    marginBottom: 20
  },
  link: {
    height: 190,
    marginBottom: 10
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(235, 236, 242, 0.5)',
    position: 'absolute',
    width: '100%',
    bottom: 10,
    left: 15,
  },
  images: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'baseline',
    width: '100%',
    justifyContent: 'space-between'
  },
  exercisesImg: {
    width: 140,
    height: 160,
    resizeMode: 'contain'
  },
  exercisesImgSmaller: {
    width: 140,
    height: 100,
    resizeMode: 'contain'
  }
});
