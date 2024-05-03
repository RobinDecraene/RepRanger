import { StyleSheet, View, Image } from 'react-native';
import React from 'react';


const DetailExercise = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imagesCard}>
        <Image
          style={styles.exercisesImg}
          source={require('../../assets/images/squat-up.png')}
        />
        <Image
          style={styles.exercisesImgSmaller}
          source={require('../../assets/images/squat-down.png')}
        />
      </View>

    </View>
  );
}

export default DetailExercise

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  imagesCard: {
    flexDirection: 'row',
    backgroundColor: '#EBECF2',
    alignItems: 'baseline',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30
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
