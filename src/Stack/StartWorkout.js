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
import { Set, SetPressed } from '../../Components/Sets';
import { ButtonSecondary } from '../../Components/Button';

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
          <Set>2 sets</Set>
          <SetPressed>3 sets</SetPressed>
          <Set>4 sets</Set>
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
          onPress={() => navigation.navigate('WorkoutMotivation')}
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
        <ButtonSecondary style={styles.margin} onPress={() => navigation.navigate('DetailWorkout')}>Stop Workout</ButtonSecondary>

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
  margin: {
    marginBottom: 20
  },
  setsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20
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
