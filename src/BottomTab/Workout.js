import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Workout = () => {
  return (
    <View style={styles.container}>
      <Text>Ga naar detail</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default Workout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
