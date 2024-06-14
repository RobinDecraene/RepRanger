import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { firebase } from '../../Firebase';

import { Image, Pressable, StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { P } from '../../Components/Text';
import { Button } from '../../Components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import { SmallTitle } from '../../Components/SmallTitle';
import { Title } from '../../Components/Title';

const Account = () => {
  const navigation = useNavigation();
  const [historyData, setHistoryData] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchUserData = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const db = firebase.firestore();
      const userRef = db.collection('users').doc(currentUser.uid);

      try {
        const userDoc = await userRef.get();
        if (userDoc.exists) {
          setUser(userDoc.data());
          const historyCollection = await userRef.collection('history').get();
          const historyData = await Promise.all(historyCollection.docs.map(async doc => {
            const historyId = doc.id;
            const historyItem = doc.data();
            const historyRef = historyItem.workout;

            if (historyRef && typeof historyRef.get === 'function') {
              const historyDoc = await historyRef.get();
              const workoutData = historyDoc.data();
              
              if (workoutData && Array.isArray(workoutData.exercises)) {
                const exercisesPromises = workoutData.exercises.map(async exerciseRef => {
                  const exerciseDoc = await exerciseRef.get();
                  return exerciseDoc.data();
                });
                const exercises = await Promise.all(exercisesPromises);

                return { id: historyId, ...historyItem, workout: workoutData, exercises };
              } else {
                return null;
              }
            } else {
              return null;
            }
          }));
          setHistoryData(historyData.filter(item => item !== null));
        } 
      } catch (error) {
        console.log('Error getting document:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const handleLogout = () => {
    Alert.alert(
      "Log uit",
      "Ben je zeker dat je wilt uitloggen?",
      [
        {
          text: "Annuleren",
          style: "cancel"
        },
        {
          text: "Log uit",
          onPress: async () => {
            try {
              await firebase.auth().signOut();
            } catch (error) {
              console.error(error);
            }
          }
        }
      ],
      { cancelable: false }
    );
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
        {user && (
          <Title style={styles.title}>{`${user.firstName} ${user.lastName}`}</Title>
        )}
        <Pressable
          onPress={() => navigation.navigate('EditAccount')}
          style={styles.icon}
        >
          <MaterialCommunityIcons name="cog" color='#4E598C' size={30} />
        </Pressable>
      
        <Image
          style={styles.profileImg}
          source={{ uri: user.profilePicture || 'https://firebasestorage.googleapis.com/v0/b/repranger-b8691.appspot.com/o/profile_pictures%2Fno-profil.png?alt=media' }}
        />

        <SmallTitle>Workout historiek</SmallTitle>
        {historyData
          .sort((a, b) => b.date - a.date)
          .map((history, index) => (
            <Card
              key={index}
              onPress={() => navigation.navigate('DetailHistory', { history: history, workout: history.workout, exercises: history.workout.exercises })}
              style={styles.card}
            >
              <Image
                style={styles.exercisesImg}
                source={{ uri: `https://firebasestorage.googleapis.com/v0/b/repranger-b8691.appspot.com/o/exercises%2F${history.workout.image_small}.png?alt=media`}}
              />
              <P style={styles.exercisesName}>{history.workout.name} {formatDate(history.date)}</P>
              <MaterialIcons name="keyboard-arrow-right" size={40} color="#4E598C" />
            </Card>
          ))}

        <Button onPress={handleLogout}>Log uit</Button>
      </View>
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#FAFAFC',
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    marginBottom: 40,
  },
  profileImg: {
    height: null,
    aspectRatio: 1,
    width: '60%',
    borderRadius: 120,
    marginBottom: 20,
    borderColor: '#D7DAE5',
    backgroundColor: '#D7DAE5',
    borderWidth: 1,
  },
  title: {
    width: '85%'
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  exercisesImg: {
    width: 60,
    height: 80,
    resizeMode: 'contain',
    marginRight: 20,
  },
  exercisesName: {
    width: '65%'
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FEEDD9',
    marginTop: 10,
    marginBottom: 20,
  },
  infoCardText: {
    alignItems: 'center',
  },
  orange: {
    color: '#C76A02',
  },
  icon: {
    position: 'absolute',
    top: 55,
    right: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
