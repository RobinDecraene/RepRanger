import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../Firebase';

import { StyleSheet, View, ScrollView } from 'react-native';
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
      <ScrollView style={styles.base} contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
          <Title>Registreer</Title>
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
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
          />
          <Button onPress={() => registerUser(email, password, firstName, lastName)} style={styles.button}>Registreer</Button>
          <ButtonLink onPress={() => navigation.navigate('Login')}>Al een account? Log hier in</ButtonLink>
        </View>
      </ScrollView>
    )
  }
  
  export default Registration
  
  const styles = StyleSheet.create({
    base: {
      backgroundColor: '#FAFAFC',
      width: "100%",
      height: '100%'
    },
    contentContainer: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
    },
    container: {
      width: '100%',
      alignItems: 'center',
    },
    button: {
      marginBottom: 10,
      marginTop: 20
    },
  });