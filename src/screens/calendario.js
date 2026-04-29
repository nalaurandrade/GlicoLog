import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function Calendario() {
  const [modalVisible, setModalVisible] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [glicose, setGlicose] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calendário</Text>

      <Calendar
        onDayPress={(day) => {
          setDataSelecionada(day.dateString);
          setModalVisible(true);
        }}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalBox}>
            <Text>Data: {dataSelecionada}</Text>

            <TextInput
              placeholder="Digite a glicose"
              keyboardType="numeric"
              value={glicose}
              onChangeText={setGlicose}
              style={styles.input}
            />

            <Button title="Salvar" onPress={() => setModalVisible(false)} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  titulo: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalFundo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  input: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 8,
    borderRadius: 5,
  },
});