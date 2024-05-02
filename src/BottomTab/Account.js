import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { firebase } from '../../Firebase';
import { P } from '../../Components/Text';
import { Button } from '../../Components/Button';
import { useNavigation } from '@react-navigation/native';

const Account = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

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

  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImg}
        source={require('../../assets/images/no-img.png')}
      />
      {user && (
        <P>{`${user.firstName} ${user.lastName}`}</P>
      )}
      <Button onPress={handleLogout}>Log uit</Button>
    </View>
  );
}

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileImg: {
    height: null,
    aspectRatio: 1,
    width: '60%',
    borderRadius: 120,
    marginTop: 30,
    marginBottom: 20,
  },
});
