import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de autenticação
    navigation.navigate('Movies'); // Navega para a tela de filmes após o login
  };

  const handleRegister = () => {
    navigation.navigate('Register'); // Navega para a tela de registro
  };

  const handleBiometricLogin = () => {
    navigation.navigate('Biometric'); // Navega para a tela de biometria
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleLogin} />

      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.link}>Não tem uma conta? Registre-se</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleBiometricLogin}>
        <Text style={styles.link}>Entrar com Biometria</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default LoginScreen;
