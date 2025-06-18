import CadastroScreen from "./src/screens/lancamento";

import { View, Text, FlatList, StyleSheet } from 'react-native';
 
 export default function App() {
   return (
   <View>
     <CadastroScreen />
   </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
