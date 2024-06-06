import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, Image, StyleSheet, View, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from '../../Components/Title';
import { Card } from '../../Components/Card';
import { P } from '../../Components/Text';
import { SmallTitle } from '../../Components/SmallTitle';
import { FAQ } from '../../Components/Faq';
import { firebase } from '../../Firebase';

const DetailTip = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title, description } = route.params;
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const faqSnapshot = await firebase.firestore().collection('faq').get();
        const allFAQs = faqSnapshot.docs.map(doc => doc.data());

        const filteredFAQs = allFAQs.filter(faq => faq.title !== title);

        const selectedFAQs = [];
        while (selectedFAQs.length < 3 && filteredFAQs.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredFAQs.length);
          selectedFAQs.push(filteredFAQs[randomIndex]);
          filteredFAQs.splice(randomIndex, 1);
        }

        setFaqData(selectedFAQs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFAQs();
  }, [title]);

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4E598C" />
      </View>
    );
  }

  return (
    <ScrollView ref={scrollViewRef} style={styles.base}>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()} style={styles.icon}>
          <MaterialIcons name="keyboard-arrow-left" size={40} color="#4E598C" />
        </Pressable>

        <Title style={styles.title}>{title}</Title>

        <Card style={styles.exerciseInfo}>
          <P>{description}</P>
          <Image style={styles.ranger} source={require('../../assets/images/ranger-head.png')} />
        </Card>

        <SmallTitle style={styles.smallTitle}>Andere vragen</SmallTitle>
        {faqData.map((faq, index) => (
          <FAQ key={index} onPress={() => { navigation.navigate('DetailTip', { title: faq.title, description: faq.description }); scrollToTop(); }}>
            {faq.title}
          </FAQ>
        ))}
      </View>
    </ScrollView>
  );
}

export default DetailTip;

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#FAFAFC',
    width: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    marginBottom: 40
  },
  title: {
    width: '85%'
  },
  icon: {
    position: 'absolute',
    top: 50,
    left: 20
  },
  ranger: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -50,
    left: -10
  },
  exerciseInfo: {
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: 50,
    alignItems: 'flex-start',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallTitle: {
    marginTop: 50
  }
});
