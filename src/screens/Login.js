import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ setLogado }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '471396317495-hanktdomad5eka59iv70b0kbh5u1vjik.apps.googleusercontent.com',
    androidClientId: '471396317495-hanktdomad5eka59iv70b0kbh5u1vjik.apps.googleusercontent.com',
    iosClientId: '471396317495-hanktdomad5eka59iv70b0kbh5u1vjik.apps.googleusercontent.com',
    webClientId: '471396317495-hanktdomad5eka59iv70b0kbh5u1vjik.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      salvarLogin();
    }
  }, [response]);

  const salvarLogin = async () => {
    try {
      await AsyncStorage.setItem('logado', 'true');
      setLogado(true);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>

      <TouchableOpacity
        style={styles.botao}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <Text style={styles.textoBotao}>Entrar com Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },
  botao: {
    backgroundColor: '#DB4437',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  }
});