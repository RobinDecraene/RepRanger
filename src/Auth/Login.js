import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../Firebase';

import { StyleSheet, View, Alert } from 'react-native';
import { Button, ButtonLink } from '../../Components/Button';
import { Input } from '../../Components/Input';
import { Title } from '../../Components/Title';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const loginUser = async (email,password) => {
      try {
          await firebase.auth().signInWithEmailAndPassword(email,password);
      } catch (error) {
        Alert.alert(
          "Verkeerde inloggegevens",
          "Je wachtwoord of email is verkeerd."
        );
      }
  }
  
  const forgetPassword = () => {
    if (!email) {
      Alert.alert(
        "Geen email",
        "Je moet je email invullen voor je dit kan doen."
      );
      return;
    }

    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      Alert.alert(
        "Check je email",
        "De wachtwoord reset mail is verzonden!"
      );
    })
    .catch(error => {
        alert(error.message);
    });
  }
  

  return (
    <View style={styles.container}>
      <Title>Login</Title>
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

      <Button onPress={()=>loginUser(email,password)} style={styles.button}>Log in</Button>
      <ButtonLink onPress={()=>navigation.navigate('Registration')} style={styles.margin}>Geen account? Regustreer u hier</ButtonLink>
      <ButtonLink onPress={()=>{forgetPassword()}}>Wachtwoord vergeten?</ButtonLink>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  button: {
    marginBottom: 10,
    marginTop: 20
  },
  margin: {
    marginBottom: 5
  }
});