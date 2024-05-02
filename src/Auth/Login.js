import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { firebase } from '../../Firebase';
import { useNavigation } from '@react-navigation/native';
import { Button, ButtonLink } from '../../Components/Button';
import { Input } from '../../Components/Input';

const Login = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  const loginUser = async (email,password) => {
      try {
          if (!isValidEmail(email)) {
              throw new Error('Invalid email address');
          }
          await firebase.auth().signInWithEmailAndPassword(email,password);
      } catch (error) {
          alert(error.message);
      }
  }
  
  const forgetPassword = () => {
      if (!isValidEmail(email)) {
          alert('Invalid email address');
          return;
      }
      firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
          alert('Password reset email sent!');
      })
      .catch(error => {
          alert(error.message);
      });
  }
  

  return (
    <View style={styles.container}>
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

      <Button onPress={()=>loginUser(email,password)}>Log in</Button>
      <ButtonLink onPress={()=>navigation.navigate('Registration')}>Geen account? Regustreer u hier</ButtonLink>
      <ButtonLink onPress={()=>{forgetPassword()}}>Wachtwoord vergeten?</ButtonLink>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
container: {
  flex:1,
  backgroundColor: '#fff',  
  alignItems:'center',
}
});