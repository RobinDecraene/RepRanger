import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { P } from '../../Components/Text';
import { firebase } from '../../Firebase';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      <P style={{fontWeight:'bold', fontSize:26,}}>
        Login
      </P>
      <View style={{marginTop:40}}>
        <TextInput style={styles.textInput} 
          placeholder="Email" 
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput style={styles.textInput} 
          placeholder="Password" 
          onChangeText={(password)=> setPassword(password)}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
          onPress={()=>loginUser(email,password)}
          style={styles.button}
      >
        <P style={{fontWeight:'bold', fontSize:22}}>Login</P>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=>navigation.navigate('Registration')}
        style={{marginTop:20,}}
      >
        <P style={{fontSize:16, fontWeight:'bold'}}>
          Don't have an account? Sign up here
        </P>
        
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=>{forgetPassword()}}
        style={{marginTop:20,}}
      >
        <P style={{fontSize:16, fontWeight:'bold'}}>
          Forget Password?
        </P>
        
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
container: {
  flex:1,  
  alignItems:'center',
  marginTop:100,
},
textInput: {
  paddingTop: 20,
  paddingBottom:10,
  width:400,
  fontSize: 20,
  borderBottomColor: '#000',
  borderBottomWidth: 1,
  marginBottom: 10,
  textAlign: 'center',
},
button: {
  marginTop:50,
  height:70,
  width:250,
  backgroundColor:'#026efd',
  alignItems:'center',
  justifyContent:'center',
  borderRadius:50,
}
});