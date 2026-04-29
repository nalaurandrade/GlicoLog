import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Calendario from './src/screens/calendario';
import Grafico from './src/screens/grafico';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="CalendarioScreen">
        <Drawer.Screen name="Gráfico" component={GraficoScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
