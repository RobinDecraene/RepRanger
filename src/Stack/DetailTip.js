import { Pressable, Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from '../../Components/Title';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from '../../Components/Card';
import { SmallTitle } from '../../Components/SmallTitle';
import { P } from '../../Components/Text';
import { FAQ } from '../../Components/Faq';
import { useNavigation } from '@react-navigation/native';

const DetailTip = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.navigate('Tips')}
          style={styles.icon}
        >
          <MaterialCommunityIcons name="arrow-left" color='#4E598C' size={30} />
        </Pressable>

        <Title style={styles.title}>Wat zijn sets en reps?</Title>

        <Card style={styles.exerciseInfo}>
          <P>
          Reps is hoeveel keer je een oefening na elkaar doet, bijvoorbeeld 5 sit-ups na
          elkaar zijn 5 reps? Sets zijn hoeveel keer je de reps doet, dus bijvoorbeeld als
          je 5 sit-ups na elkaar doet een pauze pakt en dan nog eens 5 sit-ups na elkaar doet,
          dan heb je 2 sets gedaan. Het is best dat je 8-12 reps doet en 4-8 sets per workout.
          </P>
          <Image
          style={styles.ranger}
            source={require('../../assets/images/ranger-head.png')}
          />
        </Card>

        <SmallTitle>Andere vragen</SmallTitle>
        <FAQ onPress={() => navigation.navigate('DetailTip')}>Wat zijn stets en reps?</FAQ>
        <FAQ onPress={() => navigation.navigate('DetailTip')}>Wat zijn stets en reps?</FAQ>
        <FAQ onPress={() => navigation.navigate('DetailTip')}>Wat zijn stets en reps?</FAQ>
      </View>
    </ScrollView>
  );
}

export default DetailTip

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
    marginTop: 25,
    marginBottom: 20,
    textAlign: 'center',
    width: '78%'
  },
  icon: {
    position: 'absolute',
    top: 55,
    left: 20
  },
  ranger: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -45,
    left: -10
  },
  exerciseInfo: {
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: 50,
    alignItems: 'flex-start',
    marginBottom: 60
  }
});
