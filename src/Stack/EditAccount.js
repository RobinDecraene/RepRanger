import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '../../Firebase';

import { Pressable, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from '../../Components/Title';
import { Input } from '../../Components/Input';
import { Button } from '../../Components/Button';
import { ActivityIndicator } from 'react-native-paper';

const EditAccount = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = firebase.auth().currentUser;
        const userSnapshot = await firebase.firestore().collection('users').doc(currentUser.uid).get();
        const userData = userSnapshot.data();
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    const userRef = firebase.firestore().collection('users').doc(currentUser.uid);

    const updatedData = {
      firstName,
      lastName,
      email,
    };

    try {
      await userRef.update(updatedData);
      if (password) {
        const user = firebase.auth().currentUser;
        await user.updatePassword(password);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error updating user data:', error);
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
        <Pressable onPress={() => navigation.goBack()} style={styles.icon}>
          <MaterialCommunityIcons name="arrow-left" color='#4E598C' size={30} />
        </Pressable>

        <Title>Bewerk profiel</Title>

        <Input
          placeholder="Profiel foto"
        />

        <Input
          placeholder={firstName}
          value={firstName}
          onChangeText={setFirstName}
        />

        <Input
          placeholder={lastName}
          value={lastName}
          onChangeText={setLastName}
        />

        <Input
          placeholder={email}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize='none'
        />

        <Input
          placeholder="Wachtwoord"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <Button onPress={handleSave}>Opslaan</Button>
      </View>
    </ScrollView>
  );
};

export default EditAccount;

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
  icon: {
    position: 'absolute',
    top: 55,
    left: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
