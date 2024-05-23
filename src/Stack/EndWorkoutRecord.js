import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from '../../Components/Title';
import { P } from '../../Components/Text';
import { Button } from '../../Components/Button';
import { SmallText } from '../../Components/SmallText';
import { Card } from '../../Components/Card';

const EndWorkoutRecord = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
      <Image
          style={styles.ranger}
          source={require('../../assets/images/trophy.png')}
        />
        <Title>Nieuw record</Title>
        <P>Je hebt een nieuw record behaald!</P>

        <Card style={styles.numbersCard}>
          <View style={styles.numbers}>
            <P>6</P>
            <SmallText>Oef</SmallText>
          </View>

          <View style={styles.numbers}>
            <P>300</P>
            <SmallText>Cal</SmallText>
          </View>

          <View style={styles.numbers}>
            <P>25:45</P>
            <SmallText>Min</SmallText>
          </View>
        </Card>


        <Button onPress={() => navigation.navigate('Workout')}>Mijn workouts</Button>
      </View>
    </ScrollView>
  );
}

export default EndWorkoutRecord

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#FAFAFC',
    width: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    marginBottom: 40
  },
  ranger: {
    width: 200,
    height: 400,
    resizeMode: 'contain',
    marginTop: 40
  },
  numbers: {
    alignItems: 'center'
  },
  numbersCard: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    marginTop: 20
  },
});
