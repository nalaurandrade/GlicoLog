import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from '@react-native-community/datetimepicker';

export default function CadastroScreen() {
  const [glicose, setGlicose] = useState('');
  const [date, setDate] = useState(new Date());


  
 // Função para formatar a data em português
  const formatarData =  (pdata) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long', // dia da semana
      month: 'long', // nome do mês
      day: 'numeric', // dia do mês
      year: 'numeric', // ano
      hour: 'numeric', // hora
      minute: 'numeric', // minuto
      second: 'numeric' // segundo
    }).format(pdata);
  };
  

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
       {
        <DatePicker
          testID="dateTimePicker"
          value={date}
          mode="dateTime"
          is24Hour={true}
          locale="pt"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      }
       <Text>Data:</Text>
       <Text style={styles.dateText}>Data Selecionada: {formatarData(date)}</Text>

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
  },
  dateText: {
    marginTop: 20,
    fontSize: 18,
  },
});


