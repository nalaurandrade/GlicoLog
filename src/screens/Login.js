import React, { useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }) {
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  });

  console.log(redirectUri);

    const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '471396317495-hanktdomad5eka59iv70b0kbh5u1vjik.apps.googleusercontent.com',
    webClientId: '471396317495-hanktdomad5eka59iv70b0kbh5u1vjik.apps.googleusercontent.com',
    redirectUri: "http://localhost:8081",
    });

  useEffect(() => {
    if (response?.type === 'success') {
      navigation.navigate('Calendário');
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        title="Entrar com Google"
        disabled={!request}
        onPress={() => promptAsync({ useProxy: true })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});