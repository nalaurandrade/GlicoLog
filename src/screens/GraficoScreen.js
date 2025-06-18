import React, { useState, useCallback } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function GraficoScreen() {
  const [dados, setDados] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const carregarDados = async () => {
        const jsonValue = await AsyncStorage.getItem('cadastros');
        const cadastros = jsonValue != null ? JSON.parse(jsonValue) : [];
        setDados(cadastros);
      };
      carregarDados();
    }, [])
  );

  if (dados.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Nenhum dado para exibir no gráfico.</Text>
      </View>
    );
  }

  // Preparar dados do gráfico
  const dadosOrdenados = [...dados].sort((a, b) => new Date(a.data) - new Date(b.data));

  const labels = dadosOrdenados.map((item) =>
    new Date(item.data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    })
  );

  const valores = dadosOrdenados
    .map((item) => Number(item.glicose))
    .filter((val) => !isNaN(val));

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Glicose por Dia</Text>
      <BarChart
        data={{
          labels: labels,
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
        }}
        style={styles.chart}
        verticalLabelRotation={30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 20 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  chart: { borderRadius: 10 },
});
