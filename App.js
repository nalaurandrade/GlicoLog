import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Lancamento from './src/screens/lancamento';
import CalendarioScreen from './src/screens/CalendarioScreen';
import GraficoScreen from './src/screens/GraficoScreen';
import ListaScreen from './src/screens/ListaScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Lançamento">
        <Drawer.Screen name="Lançamento" component={Lancamento} />
        <Drawer.Screen name="Lista" component={ListaScreen} />
        <Drawer.Screen name="Calendário" component={CalendarioScreen} />
        <Drawer.Screen name="Gráfico" component={GraficoScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
