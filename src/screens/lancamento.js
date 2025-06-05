import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroScreen({ navigation }) {
  const [glicose, setGlicose] = useState('');

  const salvarCadastro = async () => {
    if (!glicose) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }  

    const novoCadastro = { glicose };
    try {
      const jsonValue = await AsyncStorage.getItem('cadastros');
      const cadastros = jsonValue != null ? JSON.parse(jsonValue) : [];
      cadastros.push(novoCadastro);
      await AsyncStorage.setItem('cadastros', JSON.stringify(cadastros));
      setGlicose('');
      Alert.alert('Sucesso', 'Cadastro salvo!');
    } catch (e) {
      console.error(e);
    }
  };
 
   return (
    <View style={styles.container}>
      <Text>Glicose:</Text>
      <TextInput style={styles.input} value={glicose} onChangeText={setGlicose} />

      <Button title="Salvar" onPress={salvarCadastro} />
      <Button title="Ver Lista" onPress={() => navigation.navigate('ListaScreen')} />
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


