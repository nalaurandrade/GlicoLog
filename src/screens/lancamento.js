import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [glicose, setGlicose] = useState('');
  const [glicoseResult, setGlicoseResult] = useState('');
  
  const registrarGlicose = () => {
    const glicoseNum = parseFloat(glicose);
    if (!isNaN(glicoseNum)) { 
      const mensagem = `Glicose ${glicoseNum.toFixed(2)} registrada com sucesso`;
      setGlicoseResult(mensagem);

      Alert.alert('Registro', mensagem); 
    } else {
      const mensagemErro = 'Por favor, insira um valor válido.';
      setGlicoseResult(mensagemErro);
      Alert.alert('Erro', mensagemErro); 
    }
  };
 
   return (
    <View style={styles.container}>
      <Text>Glicose:</Text> 
      <TextInput
        placeholder='Digite a glicose' 
        keyboardType='numeric' 
        onChangeText={(gGlicose) => setGlicose(gGlicose)} 
        value={glicose}
        style={styles.input}
      />
      <Button title="Registrar Glicose" onPress={registrarGlicose} /> 
      {glicoseResult !== '' && <Text>{glicoseResult}</Text>}  

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    padding: 10,
    marginVertical: 10,
  }
});


