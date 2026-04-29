import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './src/screens/LoginScreen';
import CalendarioScreen from './src/screens/calendario';
import GraficoScreen from './src/screens/GraficoScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Drawer quando estiver logado
function DrawerRoutes({ setLogado }) {
  return (
    <Drawer.Navigator initialRouteName="Calendário">
      <Drawer.Screen name="Calendário" component={CalendarioScreen} />
      <Drawer.Screen name="Gráfico" component={GraficoScreen} />
      <Drawer.Screen name="Sair">
        {() => <LogoutScreen setLogado={setLogado} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

// Tela de logout
function LogoutScreen({ setLogado }) {
  useEffect(() => {
    const sair = async () => {
      await AsyncStorage.removeItem('logado');
      setLogado(false);
    };
    sair();
  }, []);

  return null;
}

export default function App() {
  const [logado, setLogado] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    verificarLogin();
  }, []);

  const verificarLogin = async () => {
    const status = await AsyncStorage.getItem('logado');
    if (status === 'true') {
      setLogado(true);
    }
    setCarregando(false);
  };

  if (carregando) return null;

  return (
    <NavigationContainer>
      {logado ? (
        <DrawerRoutes setLogado={setLogado} />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen {...props} setLogado={setLogado} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}