import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const BiometricScreen = ({ navigation }) => {
  useEffect(() => {
    // Verifica se o dispositivo suporta biometria
    LocalAuthentication.hasHardwareAsync()
      .then((hasHardware) => {
        if (!hasHardware) {
          Alert.alert('Biometria não disponível', 'Este dispositivo não suporta biometria');
        }
      });
  }, []);

  const handleBiometricLogin = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        Alert.alert('Autenticação bem-sucedida', 'Você foi autenticado com sucesso!');
        navigation.navigate('Movies'); // Navega para a tela de filmes após sucesso
      } else {
        Alert.alert('Falha na autenticação', 'Não foi possível autenticar usando biometria');
      }
    } catch (error) {
      console.error('Erro ao tentar autenticar', error);
      Alert.alert('Erro', 'Erro inesperado na autenticação');
    }
  };

  return (
    <View>
      <Button title="Login com Biometria" onPress={handleBiometricLogin} />
    </View>
  );
};

export default BiometricScreen;
