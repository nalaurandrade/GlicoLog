import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListaScreen() {
  const [cadastros, setCadastros] = useState([]);

  useEffect(() => {
    const carregarCadastros = async () => {
      const jsonValue = await AsyncStorage.getItem('cadastros');
      const dados = jsonValue != null ? JSON.parse(jsonValue) : [];
      setCadastros(dados);
    };

    const unsubscribe = carregarCadastros();
    return () => unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Cadastros</Text>
      <FlatList
        data={cadastros}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Nome: {item.nome}</Text>
            <Text>Email: {item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  item: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
});