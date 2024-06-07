import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { StyleSheet, View, Image } from 'react-native';
import { Button } from '../../Components/Button';
import { Title } from '../../Components/Title';
import { SmallText } from '../../Components/SmallText';


const Start = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/repranger-b8691.appspot.com/o/ranger%2Franger.png?alt=media' }}
      />
      <Title style={styles.title}>RepRanger</Title>
      <Button onPress={() => navigation.navigate('Login')}>Log in</Button>
      <Button onPress={() => navigation.navigate('Registration')}>Registreer</Button>

      <SmallText style={styles.developer}>© 2024 Decraene Robin</SmallText>
    </View>
  );
}

export default Start

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 350,
    width: 350,
    resizeMode: 'contain'
  },
  title: {
    marginBottom: 30,
    marginTop: 10,
  },
  developer: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    color: '#D7DAE5'
  }
});
