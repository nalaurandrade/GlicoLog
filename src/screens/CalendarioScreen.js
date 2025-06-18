import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CalendarioScreen() {
  const [marcacoes, setMarcacoes] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [glicose, setGlicose] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const json = await AsyncStorage.getItem('cadastros');
    const cadastros = json ? JSON.parse(json) : [];

    const novasMarcacoes = {};
    cadastros.forEach((item) => {
      const data = item.data.split('T')[0]; // yyyy-mm-dd
      novasMarcacoes[data] = {
        marked: true,
        dotColor: 'green',
      };
    });
    setMarcacoes(novasMarcacoes);
  };

  const abrirModal = (data) => {
    setDataSelecionada(data);
    setGlicose('');
    setModalVisible(true);
  };

  const salvarGlicose = async () => {
    if (!glicose || isNaN(glicose)) {
      Alert.alert('Erro', 'Digite um valor numérico válido.');
      return;
    }

    const novoRegistro = {
      glicose: parseFloat(glicose),
      data: new Date(dataSelecionada).toISOString(),
    };

    try {
      const json = await AsyncStorage.getItem('cadastros');
      const cadastros = json ? JSON.parse(json) : [];
      cadastros.push(novoRegistro);
      await AsyncStorage.setItem('cadastros', JSON.stringify(cadastros));
      setModalVisible(false);
      carregarDados();
      Alert.alert('Sucesso', 'Glicose registrada com sucesso!');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => abrirModal(day.dateString)}
        markedDates={marcacoes}
        theme={{
          selectedDayBackgroundColor: '#00adf5',
          todayTextColor: '#00adf5',
          dotColor: 'green',
        }}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Registrar Glicose</Text>
            <Text style={styles.modalDate}>Data: {dataSelecionada}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Valor da glicose"
              value={glicose}
              onChangeText={setGlicose}
            />
            <View style={styles.buttonRow}>
              <Button title="Salvar" onPress={salvarGlicose} />
              <View style={{ width: 10 }} />
              <Button title="Cancelar" color="red" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  modalDate: {
    fontSize: 16,
    marginBottom: 10,
    fontStyle: 'italic',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
