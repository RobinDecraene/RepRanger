import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { P } from '../../Components/Text';
import { firebase } from '../../Firebase';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, ButtonLink } from '../../Components/Button';
import { Input } from '../../Components/Input';

const Login = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  loginUser = async (email,password) => {
      try{
          await firebase.auth().signInWithEmailAndPassword(email,password)
      } catch (error){
        alert(error)
      }
  }

  // forget password
  const forgetPassword = () => {
      firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
          alert('Password reset email sent!')
      })
      .catch(error => {
          alert(error)
      })
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Email" 
        onChangeText={(email) => setEmail(email)}
      />

      <Input
        placeholder="Wachtwoord" 
        onChangeText={(email) => setEmail(email)}
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