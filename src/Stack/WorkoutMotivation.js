import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from '../../Components/Title';
import { P } from '../../Components/Text';
import { Card } from '../../Components/Card';
import { SmallText } from '../../Components/SmallText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const WorkoutMotivation = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Title>Squat</Title>
          <P>5:12</P>
        </View>

        <P>Halverwegen je workout goed bezig!</P>
        <Image
          style={styles.ranger}
          source={require('../../assets/images/ranger.png')}
        />

        <Card
          onPress={() => navigation.navigate('EndWorkout')}
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
      </View>
    </ScrollView>
  );
}

export default WorkoutMotivation

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
  ranger: {
    width: 200,
    height: 400,
    resizeMode: 'contain'
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
