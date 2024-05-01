import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { P } from '../Components/Text';

const Account = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImg}
        source={require('../../assets/images/no-img.png')}
      />
      <P>Voornaam Achternaam</P>

    </View>
  );
}

export default Account

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileImg: {
    height: null,
    aspectRatio: 1,
    width: '60%',
    borderRadius: 120,
    marginTop: 30,
    marginBottom: 20,
  },
});