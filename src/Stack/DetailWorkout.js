import { Pressable, StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SmallText } from '../../Components/SmallText';
import { P } from '../../Components/Text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../../Components/Button';


const DetailWorkout = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('DetailExercise')}
        style={styles.card}>
          <Image
            style={styles.exercisesImg}
            source={require('../../assets/images/squat-up.png')}
          />
          <View style={styles.cardInfo}>
            <P>Naam workout</P>
            <SmallText>Spiergroep</SmallText>
          </View>
          <MaterialCommunityIcons name="arrow-right" color="#B0B5CB" size={25} />
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('DetailExercise')}
        style={styles.card}>
          <Image
            style={styles.exercisesImg}
            source={require('../../assets/images/bench-press-up.png')}
          />
          <View style={styles.cardInfo}>
            <P>Naam workout</P>
            <SmallText>Spiergroep</SmallText>
          </View>
          <MaterialCommunityIcons name="arrow-right" color="#B0B5CB" size={25} />
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('DetailExercise')}
        style={styles.card}>
          <Image
            style={styles.exercisesImg}
            source={require('../../assets/images/squat-up.png')}
          />
          <View style={styles.cardInfo}>
            <P>Naam workout</P>
            <SmallText>Spiergroep</SmallText>
          </View>
          <MaterialCommunityIcons name="arrow-right" color="#B0B5CB" size={25} />
      </Pressable>

      <Button style={styles.button}>Start workout</Button>
    </View>
  );
}

export default DetailWorkout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#EBECF2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 30,
    width: '100%',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10
  },
  exercisesImg: {
    width: 80,
    height: 100,
    resizeMode: 'contain'
  },
  button: {
    marginTop: 20
  }
});
