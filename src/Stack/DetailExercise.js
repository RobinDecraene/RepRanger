import { StyleSheet, View, Image, Pressable } from 'react-native';
import React from 'react';
import { P } from '../../Components/Text';
import { Title } from '../../Components/Title';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import { SmallText } from '../../Components/SmallText';
import { SmallTitle } from '../../Components/SmallTitle';


const DetailExercise = () => {
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
      <View style={styles.title}>
          <Title>Squat</Title>
          <SmallText>Been spieren</SmallText>
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

        <View style={styles.exerciseInfo}>
          <Image
          style={styles.ranger}
            source={require('../../assets/images/ranger-head.png')}
          />
          <P>tips voor een goede houding</P>
        </View>

        <Card>
          <SmallTitle>Gebruikte spieren</SmallTitle>
          <Image
            style={styles.muscles}
              source={require('../../assets/images/used-muscles.png')}
            />
        </Card>

      </View>
    </ScrollView>
  );
}

export default DetailExercise

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
    marginTop: 25,
    marginBottom: 20
  },
  imagesCard: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
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
  muscles: {
    width: 300,
    height: 250,
    resizeMode: 'contain'
  },
  ranger: {
    width: 120,
    height: 120,
    resizeMode: 'contain'
  },
  exerciseInfo: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10
  }
});
