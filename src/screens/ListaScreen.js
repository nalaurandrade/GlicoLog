import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function ListaScreen() {
  const [cadastros, setCadastros] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const carregarCadastros = async () => {
        const jsonValue = await AsyncStorage.getItem('cadastros');
        const dados = jsonValue != null ? JSON.parse(jsonValue) : [];
        setCadastros(dados);
      };
      carregarCadastros();
    }, [])
  ); 

  const formatarData = (iso) =>
    new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Registros</Text>
      <FlatList
        data={cadastros}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Glicose: {item.glicose} mg/dL</Text>
            <Text>Data: {formatarData(item.data)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  item: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
});
