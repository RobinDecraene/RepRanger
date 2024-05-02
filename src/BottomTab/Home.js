import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { nl } from 'date-fns/locale';
import { P } from '../../Components/Text';

const Home = () => {
  const currentDate = new Date();
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const daysOfWeek = [];

  for (let i = 0; i < 7; i++) {
    const day = addDays(startOfCurrentWeek, i);
    const dayName = format(day, 'EEEEE', { locale: nl });
    const dayNumber = format(day, 'd');
    const isCurrentDay = isSameDay(day, currentDate);

    daysOfWeek.push({ dayName, dayNumber, isCurrentDay });
  }

  return (
    <View style={styles.container}>
      <View style={styles.agendaContainer}>
        {daysOfWeek.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <P style={[styles.dayName, day.isCurrentDay && { color: '#FCAF58', fontFamily: 'FuturaCyrillicBold' }]}>
              {day.dayName}
            </P>
            <P style={[styles.dayNumber, day.isCurrentDay && { color: '#FCAF58', fontFamily: 'FuturaCyrillicBold' }]}>
              {day.dayNumber}
            </P>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"

  },
  agendaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayName: {
    fontSize: 16,
  },
  dayNumber: {
    fontSize: 20,
  },
  monthName: {
    fontSize: 14,
  },
});

export default Home;
