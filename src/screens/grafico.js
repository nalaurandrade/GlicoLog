import React, { useState, useCallback } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function GraficoScreen() {
  const [dados, setDados] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const carregarDados = async () => {
        const jsonValue = await AsyncStorage.getItem('cadastros');
        const cadastros = jsonValue ? JSON.parse(jsonValue) : [];
        setDados(cadastros);
      };
      carregarDados();
    }, [])
  );

  if (!dados || dados.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Nenhum dado para exibir no gráfico.</Text>
      </View>
    );
  }

  const dadosOrdenados = [...dados]
    .map(item => ({
      ...item,
      glicose: Number(item.glicose)
    }))
    .filter(item => !isNaN(item.glicose))
    .sort((a, b) => new Date(a.data) - new Date(b.data));

  const labels = dadosOrdenados.map(item =>
    new Date(item.data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    })
  );

  const valores = dadosOrdenados.map(item => item.glicose);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Glicose por Dia</Text>

      <LineChart
        data={{
          labels,
          datasets: [{ data: valores }],
        }}
        width={Dimensions.get('window').width - 40}
        height={250}
        yAxisSuffix=" mg"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#f5f5f5',
          backgroundGradientTo: '#e0e0e0',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 10 },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#21480b',
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 20 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  chart: { borderRadius: 10 },
});