import { Image, Pressable, StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Title } from '../../Components/Title';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SmallTitle } from '../../Components/SmallTitle';
import { firebase } from '../../Firebase';

const Workout = () => {
  const navigation = useNavigation();
  const [myWorkoutData, setMyWorkoutData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const myWorkout = await firebase.firestore().collection('saved_workouts').get();
        const myWorkoutData = await Promise.all(myWorkout.docs.map(async doc => {
          const workout = doc.data();
          const myWorkoutRef = workout.workout;
          const myWorkoutDoc = await myWorkoutRef.get();
          const myWorkoutData = myWorkoutDoc.data();
          return { ...workout, workout: myWorkoutData };
        }));
        setMyWorkoutData(myWorkoutData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetch();
  }, []);

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
            onPress={() => navigation.navigate('DetailWorkout')}
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
            <SmallTitle>{workout.workout.name}</SmallTitle>
          </View>
        </Card>
        ))}

      </View>
    </ScrollView>
  );
}

export default Workout

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
    right: 20
  },
  link: {
    height: 190,
    marginBottom: 10
  },
  cardInfo: {
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
