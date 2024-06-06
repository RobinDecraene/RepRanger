import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import { StyleSheet, View, Image, Pressable } from 'react-native';
import { P } from '../../Components/Text';
import { Title } from '../../Components/Title';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import { SmallTitle } from '../../Components/SmallTitle';

const DetailExercise = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { exercise } = route.params;
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Title style={styles.title}>{exercise.name}</Title>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.icon}
        >
          <MaterialIcons name="keyboard-arrow-left" size={40} color="#4E598C" />
        </Pressable>


        <Card style={styles.imagesCard}>
          <Image
            style={styles.exercisesImg}
            source={{ uri: `https://firebasestorage.googleapis.com/v0/b/repranger-b8691.appspot.com/o/big_exercises%2F${exercise.image_big}.png?alt=media`}}
          />
        </Card>

        <Card style={styles.exerciseInfo}>
          <SmallTitle>Hoe doe je de oefening?</SmallTitle>
          <P>{exercise.how_to}</P>
          <Image
          style={styles.ranger}
            source={require('../../assets/images/ranger-head.png')}
          />
        </Card>

        <Card style={styles.alignLeft}>
          <SmallTitle>Gebruikte spieren</SmallTitle>
          <Image
            style={styles.muscles}
            source={{ uri: `https://firebasestorage.googleapis.com/v0/b/repranger-b8691.appspot.com/o/muscles%2F${exercise.image_muscle}.png?alt=media` }}

            />
        </Card>

      </View>
    </ScrollView>
  );
}

export default DetailExercise

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
  title: {
    width: '80%',
    textAlign: 'center'
  },
  icon: {
    position: 'absolute',
    top: 50,
    left: 20
  },
  imagesCard: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  },
  exercisesImg: {
    width: 300,
    height: 160,
    resizeMode: 'contain'
  },
  muscles: {
    width: 310,
    height: 250,
    resizeMode: 'contain'
  },
  ranger: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -50,
    left: -10
  },
  exerciseInfo: {
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: 50,
    alignItems: 'flex-start',
    marginBottom: 70
  }
});
