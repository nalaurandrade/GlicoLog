import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Grafico from './src/screens/Grafico';
import Calendario from './src/screens/Calendario';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Calendário" component={Calendario} />
        <Stack.Screen name="Gráfico" component={Grafico} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}