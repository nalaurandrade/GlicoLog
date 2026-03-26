import Navigation from './Temp';
import Grafico from './src/screens/grafico';
import Navigation from './navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
 
 export default function App() {
   return (
    <Navigation />
  );
}