import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import { Title } from '../../Components/Title';
import { firebase } from '../../Firebase';
import { Button } from '../../Components/Button';
import { P } from '../../Components/Text';
import { SmallTitle } from '../../Components/SmallTitle';
import { FAQ } from '../../Components/Faq';

const Tips = () => {
  const navigation = useNavigation();

  const workout = firebase.firestore().collection('exercises');

  const fetchData = () => {
    workout
      .where("muscle_group", "!=", null) // Filter out exercises without a muscle group
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        // Now 'data' contains only exercises with a muscle group
        console.log(data); // Or do something else with the data
      })
      .catch((error) => {
        alert(error);
      });
};

  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Title style={styles.title}>Tip van de dag</Title>
        <Card style={styles.exerciseInfo}>
          <P>
          Je moet even veel gram proteinen op een dag eten als lichaams gewicht dat je hebt. BV als je 60kg 
          weegt dan moet je 60g proteienen eten.
          </P>
          <Image
          style={styles.ranger}
            source={require('../../assets/images/ranger-head.png')} 
          />
        </Card>
        <SmallTitle>Veel gestelde vragen</SmallTitle>
        <FAQ onPress={() => navigation.navigate('DetailTip')}>Wat zijn stets en reps?</FAQ>
        <FAQ onPress={() => navigation.navigate('DetailTip')}>Wat zijn stets en reps?</FAQ>
        <FAQ onPress={() => navigation.navigate('DetailTip')}>Wat zijn stets en reps?</FAQ>
        <FAQ onPress={() => navigation.navigate('DetailTip')}>Wat zijn stets en reps?</FAQ>

      </View>
    </ScrollView>
  );
}

export default Tips

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#fff',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20
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
