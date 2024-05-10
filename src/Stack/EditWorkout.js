import { Pressable, StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SmallText } from '../../Components/SmallText';
import { P } from '../../Components/Text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../../Components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import { Title } from '../../Components/Title';


const EditWorkout = () => {
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

        <Title style={styles.title}>Naam workout</Title>

        <Card
          style={styles.card}>
            <Image
              style={styles.exercisesImg}
              source={require('../../assets/images/squat-up.png')}
            />
            <View>
              <P>Naam workout</P>
              <SmallText>Spiergroep</SmallText>
            </View>
            <MaterialCommunityIcons name="close" color="#B0B5CB" size={25} />
        </Card>

        <Card
          style={styles.card}>
            <Image
              style={styles.exercisesImg}
              source={require('../../assets/images/bench-press-up.png')}
            />
            <View>
              <P>Naam workout</P>
              <SmallText>Spiergroep</SmallText>
            </View>
            <MaterialCommunityIcons name="close" color="#B0B5CB" size={25} />
        </Card>

        <Card
          style={styles.card}>
            <Image
              style={styles.exercisesImg}
              source={require('../../assets/images/squat-up.png')}
            />
            <View>
              <P>Naam workout</P>
              <SmallText>Spiergroep</SmallText>
            </View>
            <MaterialCommunityIcons name="close" color="#B0B5CB" size={25} />
        </Card>

        <Button
          onPress={() => navigation.navigate('Exercises')}
          style={styles.button}
        >
          + Nieuwe oefening
        </Button>
      </View>
    </ScrollView>
  );
}

export default EditWorkout

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
    marginBottom: 20
  },
  icon: {
    position: 'absolute',
    top: 55,
    left: 20
  },
  iconRight: {
    position: 'absolute',
    top: 55,
    right: 20
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  exercisesImg: {
    width: 60,
    height: 80,
    resizeMode: 'contain'
  },
  button: {
    marginTop: 20
  }
});
