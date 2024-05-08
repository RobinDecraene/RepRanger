import { StyleSheet, View, Image, Pressable } from 'react-native';
import React from 'react';
import { P } from '../../Components/Text';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import { SmallTitle } from '../../Components/SmallTitle';
import { SmallText } from '../../Components/SmallText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Title } from '../../Components/Title';
import { useNavigation } from '@react-navigation/native';

const StartWorkout = () => {
  const navigation = useNavigation();
  return (
  <ScrollView style={styles.base}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Title>Squat</Title>
          <P>5:12</P>
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
          <SmallTitle>Set 1</SmallTitle>
          <View style={styles.setCardInfo}>
            <P>8 Reps</P>
            <P>40 kg</P>
          </View>
        </Card>

        <Card style={styles.setCard}>
          <SmallTitle>Set 2</SmallTitle>
          <View style={styles.setCardInfo}>
            <P>8 Reps</P>
            <P>40 kg</P>
          </View>
        </Card>

        <Card style={styles.setCard}>
          <SmallTitle>Set 3</SmallTitle>
          <View style={styles.setCardInfo}>
            <P>8 Reps</P>
            <P>40 kg</P>
          </View>
        </Card>

        <Card
          style={styles.nextExercises}>
            <Image
              style={styles.nextExercisesImg}
              source={require('../../assets/images/squat-up.png')}
            />
            <View>
              <P>Volgende oefening</P>
              <SmallText>Naam oefening</SmallText>
            </View>
            <MaterialCommunityIcons name="arrow-right" color="#B0B5CB" size={25} />
        </Card>

        <Pressable
          onPress={() => navigation.navigate('DetailWorkout')}
          style={[styles.sets, styles.margin]}
        >
            <P style={styles.setsText}>Stop Workout</P>
        </Pressable>

      </View>
    </ScrollView>
  );
}

export default StartWorkout

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
    marginTop: 25
  },
  imagesCard: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  exercisesImg: {
    width: 140,
    height: 180,
    resizeMode: 'contain'
  },
  exercisesImgSmaller: {
    width: 140,
    height: 120,
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
    backgroundColor: 'transparent'
  },
  margin: {
    marginBottom: 20
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
  },
  nextExercises: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  nextExercisesImg: {
    width: 80,
    height: 100,
    resizeMode: 'contain'
  }
});
