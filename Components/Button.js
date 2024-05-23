import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { P } from './Text';

export function Button({ children, onPress, style }) {
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={handlePress}>
      <P style={{ color: "#FAFAFC", fontSize: 20 }}>{ children }</P>
    </TouchableOpacity>
  );
}

export function ButtonSecondary({ children, onPress, style }) {
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={[styles.buttonSecondary, style]} onPress={handlePress}>
      <P style={{ color: "#FCAF58", fontSize: 20 }}>{ children }</P>
    </TouchableOpacity>
  );
}

export function ButtonLink({ children, onPress, style }) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={style} onPress={handlePress}>
      <P style={{ color: "#FCAF58", fontSize: 20 }}>{ children }</P>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor:'#FCAF58',
    alignItems:'center',
    justifyContent:'center',
    padding: 15,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 50,
    marginBottom: 10
  },
  buttonSecondary: {
    backgroundColor:'transparent',
    borderColor: '#FCAF58',
    borderWidth: 1,
    alignItems:'center',
    justifyContent:'center',
    padding: 15,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 50,
    marginBottom: 10
  }
});