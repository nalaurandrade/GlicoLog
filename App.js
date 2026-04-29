import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Calendario from './src/screens/calendario';
import Grafico from './src/screens/grafico';
import Login from './src/screens/Login';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">

        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Calendário" component={Calendario} />
        <Drawer.Screen name="Gráfico" component={Grafico} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}