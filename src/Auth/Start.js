import { StyleSheet, View } from 'react-native';
import React from 'react';
import { P } from '../../Components/Text';
import { Link } from '@react-navigation/native';


const Start = () => {
  return (
    <View style={styles.container}>
      <P>Start</P>
      <Link to='/Login'>Login</Link>
      <Link to='/Registration'>Registration</Link>
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
