import { Image, Pressable, StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Title } from '../../Components/Title';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SmallTitle } from '../../Components/SmallTitle';
import { firebase } from '../../Firebase';
import { SmallText } from '../../Components/SmallText';


const Workout = () => {
  const navigation = useNavigation();
  const [myWorkoutData, setMyWorkoutData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const myWorkout = await firebase.firestore().collection('workouts').where('saved_workout', '==', true).get();
        const myWorkoutData = await Promise.all(myWorkout.docs.map(async doc => {
          const workout = doc.data();
          const workoutId = doc.id;
  
          const exercisesPromises = workout.exercises.map(async exerciseRef => {
            const exerciseDoc = await exerciseRef.get();
            return exerciseDoc.data();
          });
          const exercises = await Promise.all(exercisesPromises);
  
          const muscleGroupRef = workout.muscle_group;
          const muscleGroupDoc = await muscleGroupRef.get();
          const muscleGroupData = muscleGroupDoc.data();
  
          return { ...workout, id: workoutId, muscleGroup: muscleGroupData, exercises };
        }));
        setMyWorkoutData(myWorkoutData);
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetch();
  }, []);
  
  const toggleSavedWorkout = async (index) => {
    try {
      const updatedWorkoutData = [...myWorkoutData];
      const workoutId = updatedWorkoutData[index].id;
      updatedWorkoutData[index].saved_workout = !updatedWorkoutData[index].saved_workout;
      setMyWorkoutData(updatedWorkoutData);
      
      // Update Firestore
      await firebase.firestore().collection('workouts').doc(workoutId).update({
        saved_workout: updatedWorkoutData[index].saved_workout
      });
  
      // Refetch data
      const myWorkout = await firebase.firestore().collection('workouts').where('saved_workout', '==', true).get();
      const updatedMyWorkoutData = await Promise.all(myWorkout.docs.map(async doc => {
        const workout = doc.data();
        const workoutId = doc.id;
  
        const exercisesPromises = workout.exercises.map(async exerciseRef => {
          const exerciseDoc = await exerciseRef.get();
          return exerciseDoc.data();
        });
        const exercises = await Promise.all(exercisesPromises);
  
        const muscleGroupRef = workout.muscle_group;
        const muscleGroupDoc = await muscleGroupRef.get();
        const muscleGroupData = muscleGroupDoc.data();
  
        return { ...workout, id: workoutId, muscleGroup: muscleGroupData, exercises };
      }));
      setMyWorkoutData(updatedMyWorkoutData);
    } catch (error) {
      console.error('Error toggling saved workout:', error);
    }
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
        <Title style={styles.title}>Mijn workouts</Title>
        <Pressable
          onPress={() => navigation.navigate('NiewWorkout')}
          style={styles.icon}
        >
          <MaterialCommunityIcons name="plus-circle" color='#4E598C' size={30} />
        </Pressable>

        {myWorkoutData.map((workout, index) => (
          <Card
            key={index}
            onPress={() => navigation.navigate('DetailWorkout', { name: workout.name, exercises: workout.exercises })}
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
                <SmallText>{workout.muscleGroup.name}</SmallText>
              </View>
              {workout.saved_workout ? (
                <MaterialCommunityIcons onPress={() => toggleSavedWorkout(index)} name="heart" color='#4E598C' size={30} />
              ) : (
                <MaterialCommunityIcons onPress={() => toggleSavedWorkout(index)} name="heart-outline" color='#4E598C' size={30} />
              )}
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

export default Workout;

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
    backgroundColor: '#fff',
    marginBottom: 40
  },
  title: {
    marginTop: 25,
    marginBottom: 20
  },
  icon: {
    position: 'absolute',
    top: 55,
    right: 20
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
