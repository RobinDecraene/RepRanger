import { StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import { P } from '../../Components/Text';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../Components/Button';
import { ScrollView } from 'react-native-gesture-handler';

const Tips = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Button onPress={() => navigation.navigate('DetailTip')}>Ga naar detail</Button>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

export default Tips

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#fff',
    width: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
