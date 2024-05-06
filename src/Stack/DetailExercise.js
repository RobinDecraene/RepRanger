import { StyleSheet, View, Image, Pressable } from 'react-native';
import React from 'react';
import { P } from '../../Components/Text';
import { Title } from '../../Components/Title';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';


const DetailExercise = () => {
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
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

        <View style={styles.setsRow}>
          <Pressable style={styles.sets}>
            <P style={styles.setsText}>2 sets</P>
          </Pressable>
          <Pressable style={styles.setsPressed}>
            <P style={styles.setsPressedText}>3 sets</P>
          </Pressable>
          <Pressable style={styles.sets}>
            <P style={styles.setsText}>4 sets</P>
          </Pressable>
        </View>

        <Card style={styles.setCard}>
          <Title>Set 1</Title>
          <View style={styles.setCardInfo}>
            <P>8 Reps</P>
            <P>40 kg</P>
          </View>
        </Card>

        <Card style={styles.setCard}>
          <Title>Set 2</Title>
          <View style={styles.setCardInfo}>
            <P>8 Reps</P>
            <P>40 kg</P>
          </View>
        </Card>

        <Card style={styles.setCard}>
          <Title>Set 3</Title>
          <View style={styles.setCardInfo}>
            <P>8 Reps</P>
            <P>40 kg</P>
          </View>
        </Card>

        <View style={styles.exerciseInfo}>
          <Image
          style={styles.ranger}
            source={require('../../assets/images/ranger-head.png')}
          />
          <P>tips voor een goede houding</P>
        </View>

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
  imagesCard: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
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
  setsRow: {
    flexDirection: 'row',
    alignItems: 'center ',
    width: '99%',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20
  },
  sets: {
    borderWidth: 1.5,
    borderRadius: 40,
    borderColor: '#FCAF58',
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },
  setsText: {
    color: '#FCAF58'
  },
  setsPressed: {
    backgroundColor: '#FCAF58',
    borderRadius: 40,
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },
  setsPressedText: {
    color: '#fff'
  },
  setCard: {
    alignItems: 'flex-start',
    marginBottom: 10
  },
  setCardInfo: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10
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
