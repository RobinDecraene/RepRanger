import { StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import { P } from '../../Components/Text';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../Components/Button';

const Tips = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('Detail')}>Ga naar detail</Button>
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
