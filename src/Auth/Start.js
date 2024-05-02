import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button } from '../../Components/Button';
import { useNavigation } from '@react-navigation/native';
import { Title } from '../../Components/Title';


const Start = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Title>RepRanger</Title>
      <Button onPress={() => navigation.navigate('Login')}>Log in</Button>
      <Button onPress={() => navigation.navigate('Registration')}>Registreer</Button>
    </View>
  );
}

export default Start

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
