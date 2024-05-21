import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../Firebase';

import { StyleSheet, View } from 'react-native';
import { Input } from '../../Components/Input';
import { Button, ButtonLink } from '../../Components/Button';
import { Title } from '../../Components/Title';


const Registration = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

    registerUser = async (email,password, firstName, lastName) => {
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(() => {
          firebase.auth().currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://repranger-b8691.firebaseapp.com',
           })
            .then(() => {
              firebase.firestore().collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                  firstName,
                  lastName,
                  email,
              })
            })
            .catch((error) => {
              alert(error)
          })
        })
        .catch((error) => {
            alert(error)
        })
    }


  return (
    <View style={styles.container}>
      <Title style={styles.title}>Registreer</Title>
      <Input
        placeholder="Voornaam" 
        onChangeText={(firstName) => setFirstName(firstName)}
      />

      <Input
        placeholder="Achternaam" 
        onChangeText={(lastName) => setLastName(lastName)}
      />

      <Input
        placeholder="Email" 
        onChangeText={(email) => setEmail(email)}
        keyboardType="email-address"
        autoCapitalize='none'
      />

      <Input
        placeholder="Wachtwoord" 
        onChangeText={(password)=> setPassword(password)}
        secureTextEntry={true}
      />

      <Button onPress={()=>registerUser(email,password, firstName, lastName)}>Registreer</Button>
      <ButtonLink onPress={()=>navigation.navigate('Login')}>Al een account? Log hier in</ButtonLink>
    </View>
  )
}

export default Registration

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 20
  }
});