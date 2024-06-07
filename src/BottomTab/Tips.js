import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../Firebase';

import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Card } from '../../Components/Card';
import { Title } from '../../Components/Title';
import { P } from '../../Components/Text';
import { SmallTitle } from '../../Components/SmallTitle';
import { FAQ } from '../../Components/Faq';
import { Input } from '../../Components/Input';
import { SearchBar } from '../../Components/SearchBar';

const Tips = () => {
  const navigation = useNavigation();
  const [tipsData, setTipsData] = useState([]);
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTipsAndFAQ = async () => {
      try {
        const tips = await firebase.firestore().collection('tips').get();
        const tipsData = tips.docs.map(doc => doc.data());
        setTipsData(tipsData);

        const faqSnapshot = await firebase.firestore().collection('faq').get();
        const faqData = faqSnapshot.docs.map(doc => doc.data());
        setFaqData(faqData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTipsAndFAQ();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4E598C" />
      </View>
    );
  }

  const randomTipIndex = Math.floor(Math.random() * tipsData.length);
  const randomTip = tipsData[randomTipIndex];

  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Title>Tip van de dag</Title>
        <Card style={styles.tip}>
          <P style={styles.tipText}>{randomTip.tip}</P>
          <Image
            style={styles.ranger}
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/repranger-b8691.appspot.com/o/ranger%2Franger-head.png?alt=media' }}
          />
        </Card>
        <SmallTitle>Veel gestelde vragen</SmallTitle>
        {faqData.map((faq, index) => (
          <FAQ key={index} onPress={() => navigation.navigate('DetailTip', {title: faq.title, description: faq.description})}>
            {faq.title}
          </FAQ>
        ))}
      </View>
    </ScrollView>
  );
}

export default Tips;

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#FAFAFC',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40
  },
  ranger: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -50,
    left: -5
  },
  tip: {
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: 60,
    alignItems: 'flex-start',
    marginBottom: 80,
    backgroundColor: '#FEEDD9',
  },
  tipText: {
    color: '#C76A02'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
