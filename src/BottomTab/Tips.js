import { StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import { P } from '../../Components/Text';

const Tips = () => {
  return (
    <View style={styles.container}>
      <P>Ga naar detail</P>
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
