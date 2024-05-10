import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { Title } from '../../Components/Title';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SmallTitle } from '../../Components/SmallTitle';
import { P } from '../../Components/Text';
import { SmallText } from '../../Components/SmallText';
import { Set, SetPressed } from '../../Components/Sets';

const NiewWorkout = () => {
  const navigation = useNavigation();
  return (
<ScrollView style={styles.base}>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.icon}
        >
          <MaterialCommunityIcons name="arrow-left" color='#4E598C' size={30} />
        </Pressable>

        <Title style={styles.title}>Alle workouts</Title>

        <View style={styles.setsRow}>
          <SetPressed>All</SetPressed>
          <Set>Benen</Set>
          <Set>Armen</Set>
          <Set>Rug</Set>
        </View>

        <Card
          onPress={() => navigation.navigate('DetailWorkout')}
        >
          <View style={styles.images}>
            <Image
              style={styles.exercisesImg}
              source={require('../../assets/images/squat-up.png')}
            />
            <Image
              style={styles.exercisesImgSmaller}
              source={require('../../assets/images/squat-down.png')}
            />
          </View>

          <View style={styles.cardInfo}>
            <View>
              <SmallTitle>Naam workout</SmallTitle>
              <SmallText>Spiergroep</SmallText>
            </View>

            <MaterialCommunityIcons name="heart-outline" color='#4E598C' size={30} />
          </View>
        </Card>

        <Card
          onPress={() => navigation.navigate('DetailWorkout')}
        >
          <View style={styles.images}>
            <Image
              style={styles.exercisesImg}
              source={require('../../assets/images/squat-up.png')}
            />
            <Image
              style={styles.exercisesImgSmaller}
              source={require('../../assets/images/squat-down.png')}
            />
          </View>

          <View style={styles.cardInfo}>
            <View>
              <SmallTitle>Naam workout</SmallTitle>
              <SmallText>Spiergroep</SmallText>
            </View>
            <MaterialCommunityIcons name="heart-outline" color='#4E598C' size={30} />
          </View>
        </Card>

      </View>
    </ScrollView>
  );
}

export default NiewWorkout

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#fff',
    width: '100%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  title: {
    marginTop: 25,
    marginBottom: 20
  },
  icon: {
    position: 'absolute',
    top: 55,
    left: 20
  },
  setsRow: {
    flexDirection: 'row',
    alignItems: 'center ',
    width: '99%',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20
  },
  margin: {
    marginBottom: 20
  },
  link: {
    height: 190,
    marginBottom: 10
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(235, 236, 242, 0.5)',
    position: 'absolute',
    width: '100%',
    bottom: 10,
    left: 15,
  },
  images: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'baseline',
    width: '100%',
    justifyContent: 'space-between'
  },
  exercisesImg: {
    width: 140,
    height: 160,
    resizeMode: 'contain'
  },
  exercisesImgSmaller: {
    width: 140,
    height: 100,
    resizeMode: 'contain'
  }
});
