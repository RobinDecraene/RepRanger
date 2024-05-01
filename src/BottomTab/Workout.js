import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Title } from '../Components/Title';

const Workout = () => {
  return (
    <View style={styles.container}>

        <View style={styles.card}>
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
        </View>



        <View style={styles.card}>
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
        </View>

    </View>
  );
}

export default Workout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  card: {
    backgroundColor: '#EBECF2',
    padding: 15,
    borderRadius: 20,
    minWidth: '100%',
    alignItems: 'center',
    marginBottom: 20
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
    height: 'auto',
    backgroundColor: 'transparent',
    alignItems: 'baseline'
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
