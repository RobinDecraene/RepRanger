import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from '../../Components/Title';
import { P } from '../../Components/Text';
import { Button } from '../../Components/Button';
import { useNavigation } from '@react-navigation/native';
import { SmallText } from '../../Components/SmallText';
import { Card } from '../../Components/Card';

const EndWorkout = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
      <Image
          style={styles.ranger}
          source={require('../../assets/images/ranger-hands-up.png')}
        />
        <Title>Goed gedaan</Title>
        <P>je hebt een volledige workout gedaan!</P>

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

export default EndWorkout

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
