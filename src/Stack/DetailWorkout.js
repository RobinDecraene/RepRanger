import { Pressable, StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SmallText } from '../../Components/SmallText';
import { P } from '../../Components/Text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../../Components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';


const DetailWorkout = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Card
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
        </Card>

        <Card
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
        </Card>

        <Card
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
        </Card>

        <Button style={styles.button}>Start workout</Button>
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
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
