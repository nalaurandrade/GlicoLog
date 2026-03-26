import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Grafico from './src/screens/grafico';
import Lancamento from './src/screens/lancamento';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
     <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Lancamento" component={Lancamento} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}