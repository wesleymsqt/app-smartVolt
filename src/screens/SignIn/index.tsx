import { View, Text, ScrollView, TextInput, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import { styles } from '@/screens/SignIn/styles';
import { colors } from '@/theme/colors';
import { Logo } from '@/components/Logo';
import { FeatureCarousel } from '@/components/FeatureCarousel';
import { Button } from '@/components/Button';

export function SignIn() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const apiUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/login' : 'http://localhost:8000/api/login';

  async function handleLogin() {
    if (!email || !password) {
      return Alert.alert('Login', 'Preencha todos os campos.');
    }

    setIsLoading(true);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.access_token);
        console.log('Login successful, token:', data.access_token);
        navigation.navigate('Home');
      } else {
        Alert.alert('Login', data.message || 'Email ou senha inválidos.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Login', 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Logo width={100} height={100} color={colors.primary} />
              <Text style={styles.topTitle}>Gerencie Seus Aparelhos </Text>
              <Text style={styles.title}>no Smart Volt </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.authContainer}>
            <Text style={styles.authTitle}>Acesse sua conta</Text>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <Button title="Entrar" onPress={handleLogin} isLoading={isLoading} />
            </View>
          </View>
        </View>

        <FeatureCarousel />
      </ScrollView>
    </SafeAreaView>
  );
}
