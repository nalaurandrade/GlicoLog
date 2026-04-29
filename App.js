import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Calendario from './src/screens/Calendario';
import Grafico from './src/screens/Grafico';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Calendário">

        <Drawer.Screen name="Calendário" component={Calendario} />
        <Drawer.Screen name="Gráfico" component={Grafico} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}