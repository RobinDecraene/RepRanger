import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { Title } from '../../Components/Title';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';

const Workout = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>

        <Card
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
            <Title>Naam workout</Title>
          </View>
        </Card>

        <Card
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
            <Title>Naam workout</Title>
          </View>
        </Card>

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
