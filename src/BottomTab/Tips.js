import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Tips = () => {
  return (
    <View style={styles.container}>
      <Text>Ga naar detail</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default Tips

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
