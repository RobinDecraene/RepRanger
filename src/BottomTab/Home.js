import { Keyboard, StatusBar, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { P } from '../../Components/Text';
import { firebase } from '../../Firebase'
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Home = () => {
  const navigation = useNavigation();
  const workout = firebase.firestore().collection('newData');
  const [addData, setAddData] = useState('');
  
  const addField = () => {
    if (addData && addData.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addData,
        createdAt: timestamp
      };

      workout
        .add(data)
        .then(() => {
          setAddData('');
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
  return (
    <View style={styles.container}>
      <P
      onPress={() => navigation.navigate('Detail')}
      >Ga naar detail</P>

    <TextInput
      onChangeText={(heading) => setAddData(heading)}
      value={addData}
      multiline={true}
    />

    <TouchableOpacity onPress={addField}>
      <P>Add</P>
    </TouchableOpacity>


      <StatusBar style="auto" />
    </View>
  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
