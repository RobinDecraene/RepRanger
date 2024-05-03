import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { P } from './Text';

export function Button({ children, onPress }) {
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <P style={{ fontFamily: 'FuturaCyrillicBook', color: "#fff", fontSize: 20 }}>{ children }</P>
    </TouchableOpacity>
  );
}

export function ButtonLink({ children, onPress }) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <P style={{ fontFamily: 'FuturaCyrillicBook', color: "#FCAF58", fontSize: 20 }}>{ children }</P>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor:'#FCAF58',
    alignItems:'center',
    justifyContent:'center',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 50,
    marginBottom: 10
  }
});