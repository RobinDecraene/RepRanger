import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { P } from '../../Components/Text';
import { firebase } from '../../Firebase';
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input } from '../../Components/Input';
import { Button, ButtonLink } from '../../Components/Button';

const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

    registerUser = async (email,password, firstName, lastName) => {
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(() => {
          firebase.auth().currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://expo-33883.firebaseapp.com',
           })
          .then(() => {
                alert("Email sent")
            }).catch((error) => {
                alert(error)
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
      <Input
        placeholder="First Name" 
        onChangeText={(firstName) => setFirstName(firstName)}
      />

      <Input
        placeholder="Last Name" 
        onChangeText={(lastName) => setLastName(lastName)}
      />

      <Input
        placeholder="Email" 
        onChangeText={(email) => setEmail(email)}
        keyboardType="email-address"
      />

      <Input
        placeholder="Password" 
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
    flex:1,
    backgroundColor: '#fff',  
    alignItems:'center',
  }
});