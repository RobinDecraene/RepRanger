import { StyleSheet, View, Image, Pressable } from 'react-native';
import React from 'react';
import { P } from '../../Components/Text';
import { Title } from '../../Components/Title';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import { SmallText } from '../../Components/SmallText';
import { SmallTitle } from '../../Components/SmallTitle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';


const DetailExercise = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, how_to } = route.params;
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Title style={styles.title}>{name}</Title>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.icon}
        >
          <MaterialCommunityIcons name="arrow-left" color='#4E598C' size={30} />
        </Pressable>

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

        <Card style={styles.exerciseInfo}>
          <SmallTitle>Hoe doe je de oefening?</SmallTitle>
          <P>{how_to}</P>
          <Image
          style={styles.ranger}
            source={require('../../assets/images/ranger-head.png')}
          />
        </Card>

        <Card style={styles.alignLeft}>
          <SmallTitle>Gebruikte spieren</SmallTitle>
          <Image
            style={styles.muscles}
              source={require('../../assets/images/used-muscles.png')}
            />
        </Card>

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
    marginBottom: 40
  },
  title: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20,
    width: '80%',
    textAlign: 'center'
  },
  icon: {
    position: 'absolute',
    top: 55,
    left: 20
  },
  imagesCard: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
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
  muscles: {
    width: 300,
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
