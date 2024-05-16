import { Pressable, StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SmallText } from '../../Components/SmallText';
import { P } from '../../Components/Text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../../Components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import { Title } from '../../Components/Title';


const DetailWorkout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, exercises } = route.params;
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.icon}
        >
          <MaterialCommunityIcons name="arrow-left" color='#4E598C' size={30} />
        </Pressable>

        <Title style={styles.title}>{name}</Title>
        <Pressable
          onPress={() => navigation.navigate('EditWorkout', { name: name, exercises: exercises })}
          style={styles.iconRight}
        >
          <MaterialCommunityIcons name="cog" color='#4E598C' size={30} />
        </Pressable>

        {exercises.map((exercise, index) => (
          <Card
            key={index}
            onPress={() => navigation.navigate('DetailExercise' , { name: exercise.name, how_to: exercise.how_to })}
            style={styles.card}>
              <Image
                style={styles.exercisesImg}
                source={require('../../assets/images/squat-up.png')}
              />

              <P style={styles.cardName}>{exercise.name}</P>

              <MaterialCommunityIcons name="arrow-right" color="#B0B5CB" size={25} />
          </Card>
        ))}

        <Button
          onPress={() => navigation.navigate('StartWorkout', { exercises: exercises })}
          style={styles.button}
        >
          Start workout
        </Button>
      </View>
    </ScrollView>
  );
}

export default DetailWorkout

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
    marginBottom: 20
  },
  icon: {
    position: 'absolute',
    top: 55,
    left: 20
  },
  iconRight: {
    position: 'absolute',
    top: 55,
    right: 20
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  cardName: {
    width: '65%'
  },
  exercisesImg: {
    width: 60,
    height: 80,
    resizeMode: 'contain'
  },
  button: {
    marginTop: 20
  }
});
