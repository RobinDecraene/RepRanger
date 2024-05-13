import { Image, Pressable, StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { firebase } from '../../Firebase';
import { P } from '../../Components/Text';
import { Button } from '../../Components/Button';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import { SmallText } from '../../Components/SmallText';
import { SmallTitle } from '../../Components/SmallTitle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Account = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const db = firebase.firestore();
      const userRef = db.collection('users').doc(currentUser.uid);

      userRef.get().then((doc) => {
        if (doc.exists) {
          setUser(doc.data());
        } else {
          console.log('No such document!');
        }
      }).catch((error) => {
        console.log('Error getting document:', error);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate('Start');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4E598C" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.navigate('EditAccount')}
          style={styles.icon}
        >
          <MaterialCommunityIcons name="cog" color='#4E598C' size={30} />
        </Pressable>
      
        <Image
          style={styles.profileImg}
          source={require('../../assets/images/no-profil.png')}
        />
        {user && (
          <P>{`${user.firstName} ${user.lastName}`}</P>
        )}

        <Card style={styles.infoCard}>
          <View style={styles.infoCardText}>
            <P>5</P>
            <SmallText style={styles.orange}>Workout/week</SmallText>
          </View>

          <View style={styles.infoCardText}>
            <P>25:35</P>
            <SmallText style={styles.orange}>Gemiddelde tijd</SmallText>
          </View>
        </Card>

        <SmallTitle>Workout historiek</SmallTitle>
        <Card
          style={styles.card}>
            <Image
              style={styles.exercisesImg}
              source={require('../../assets/images/bench-press-up.png')}
            />
            <View>
              <P>Naam workout</P>
              <View style={styles.cardInfo}>
                <SmallText>6 oef</SmallText>
                <SmallText>300 cal</SmallText>
                <SmallText>5:20 min</SmallText>
              </View>
              
            </View>
        </Card>

        <Card
          style={styles.card}>
            <Image
              style={styles.exercisesImg}
              source={require('../../assets/images/bench-press-up.png')}
            />
            <View>
              <P>Naam workout</P>
              <View style={styles.cardInfo}>
                <SmallText>6 oef</SmallText>
                <SmallText>300 cal</SmallText>
                <SmallText>5:20 min</SmallText>
              </View>
              
            </View>
        </Card>

        <Card
          style={styles.card}>
            <Image
              style={styles.exercisesImg}
              source={require('../../assets/images/bench-press-up.png')}
            />
            <View>
              <P>Naam workout</P>
              <View style={styles.cardInfo}>
                <SmallText>6 oef</SmallText>
                <SmallText>300 cal</SmallText>
                <SmallText>5:20 min</SmallText>
              </View>
              
            </View>
        </Card>

        <Button onPress={handleLogout}>Log uit</Button>
      </View>
    </ScrollView>
  );
}

export default Account;

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
  profileImg: {
    height: null,
    aspectRatio: 1,
    width: '60%',
    borderRadius: 120,
    marginTop: 40,
    marginBottom: 20,
    borderColor: '#4E598C',
    borderWidth: 1
  },
  card: {
    flexDirection: 'row'
  },
  exercisesImg: {
    width: 60,
    height: 80,
    resizeMode: 'contain',
    marginRight: 20
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%'
  },
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FEEDD9',
    marginTop: 10,
    marginBottom: 20
  },
  infoCardText: {
    alignItems: 'center'
  },
  orange: {
    color: '#FCAF58'
  },
  icon: {
    position: 'absolute',
    top: 55,
    right: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
