import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from '@react-native-community/datetimepicker';

export default function Lancamento({ navigation }) {
  const [glicose, setGlicose] = useState('');
  const [date, setDate] = useState(new Date());

  const formatarData = (pdata) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(pdata);
  };

  const salvarCadastro = async () => {
    if (!glicose) {
      Alert.alert('Atenção', 'Preencha o valor da glicose.');
      return;
    }

    const novoCadastro = {
      glicose: parseFloat(glicose),
      data: date.toISOString(),
    };

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
      <Text style={styles.label}>Data:</Text>
      <DatePicker
        testID="dateTimePicker"
        value={date}
        mode="datetime"
        is24Hour={true}
        locale="pt"
        display="default"
        onChange={(event, selectedDate) => {
          if (selectedDate) {
            setDate(selectedDate);
          }
        }}
      />
      <Text style={styles.dateText}>Selecionada: {formatarData(date)}</Text>

      <Text style={styles.label}>Glicose (mg/dL):</Text>
      <TextInput
        style={styles.input}
        value={glicose}
        onChangeText={setGlicose}
        keyboardType="numeric"
      />

      <Button title="Salvar" onPress={salvarCadastro} />
      <View style={{ height: 10 }} />
      <Button title="Ver Lista" onPress={() => navigation.navigate('Lista')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 20,
    fontStyle: 'italic',
  },
});
