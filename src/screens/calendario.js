import React from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function Calendario() {
  return (
    <View>
      <Text>Calendário</Text>
      <Calendar />
    </View>
  );
}