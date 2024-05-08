import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import { Title } from '../../Components/Title';
import { firebase } from '../../Firebase';
import { Button } from '../../Components/Button';

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
        <Title style={styles.title}>Tips</Title>

        <Card
          onPress={() => navigation.navigate('DetailTip')}
        >
          <Title>Hoe stel je een goede workout op?</Title>
        </Card>

        <Card
          onPress={() => navigation.navigate('DetailTip')}
        >
          <Title>Wat zijn sets en reps?</Title>
        </Card>

        <Card
          onPress={() => navigation.navigate('DetailTip')}
        >
          <Title>Hoeveel proteinen moet ik op een dag eten?</Title>
        </Card>

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
});
