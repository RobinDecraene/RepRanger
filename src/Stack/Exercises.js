import { Pressable, StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Title } from '../../Components/Title';
import { Set, SetPressed } from '../../Components/Sets';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../../Components/Card';
import { SmallText } from '../../Components/SmallText';
import { SmallTitle } from '../../Components/SmallTitle';

const Exercises = () => {
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

        <Title style={styles.title}>Oefeningen</Title>

        <View style={styles.setsRow}>
          <SetPressed>All</SetPressed>
          <Set>Benen</Set>
          <Set>Armen</Set>
          <Set>Rug</Set>
        </View>

      <View style={styles.exercises}>
        <Card style={styles.card}>
          <Image
              style={styles.exercisesImg}
              source={require('../../assets/images/squat-up.png')}
            />
            <View style={styles.cardInfo}>
              <View>
                <SmallTitle>Squat</SmallTitle>
                <SmallText>Spiergroep</SmallText>
              </View>
              <MaterialCommunityIcons name="heart-outline" color='#4E598C' size={30} />
            </View>
        </Card>

        <Card style={styles.card}>
          <Image
              style={styles.exercisesImg}
              source={require('../../assets/images/squat-up.png')}
            />
            <View style={styles.cardInfo}>
              <View>
                <SmallTitle>Squat</SmallTitle>
                <SmallText>Spiergroep</SmallText>
              </View>
              <MaterialCommunityIcons name="heart-outline" color='#4E598C' size={30} />
            </View>
        </Card>

        <Card style={styles.card}>
          <Image
              style={styles.exercisesImg}
              source={require('../../assets/images/squat-up.png')}
            />
            <View style={styles.cardInfo}>
              <View>
                <SmallTitle>Squat</SmallTitle>
                <SmallText>Spiergroep</SmallText>
              </View>
              <MaterialCommunityIcons name="heart-outline" color='#4E598C' size={30} />
            </View>
        </Card>

        <Card style={styles.card}>
          <Image
              style={styles.exercisesImg}
              source={require('../../assets/images/squat-up.png')}
            />
            <View style={styles.cardInfo}>
              <View>
                <SmallTitle>Squat</SmallTitle>
                <SmallText>Spiergroep</SmallText>
              </View>
              <MaterialCommunityIcons name="heart-outline" color='#4E598C' size={30} />
            </View>
        </Card>
      </View>

      </View>
    </ScrollView>
  );
}

export default Exercises

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
    backgroundColor: '#fff',
    marginBottom: 40

  },
  title: {
    marginTop: 25,
    marginBottom: 20
  },
  exercises: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  card: {
    width: '48%'
  },
  exercisesImg: {
    width: 140,
    height: 160,
    resizeMode: 'contain'
  },
  cardInfo: {
    backgroundColor: 'rgba(235, 236, 242, 0.5)',
    position: 'absolute',
    width: '100%',
    bottom: 10,
    left: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});
