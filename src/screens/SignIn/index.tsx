import { View, Text, ScrollView, TextInput, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '@/screens/SignIn/styles';
import { colors } from '@/theme/colors';
import { Logo } from '@/components/Logo';
import { FeatureCarousel } from '@/components/FeatureCarousel';
import { Button } from '@/components/Button';

export function SignIn() {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const apiUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api' : 'http://localhost:8000/api';

  async function handleLogin() {
    if (!email || !password) {
      return Alert.alert('Login', 'Preencha todos os campos.');
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('@storage_Key', data.access_token);
        console.log('Login successful, token saved:', data.access_token);
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

  async function handleRegister() {
    if (!name || !email || !password || !passwordConfirmation) {
      return Alert.alert('Cadastro', 'Preencha todos os campos.');
    }

    if (password !== passwordConfirmation) {
      return Alert.alert('Cadastro', 'As senhas não conferem.');
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Cadastro', 'Cadastro realizado com sucesso! Faça o login para continuar.');
        setIsLogin(true);
      } else {
        Alert.alert('Cadastro', data.message || 'Não foi possível realizar o cadastro.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      Alert.alert('Cadastro', 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
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
            <Text style={styles.authTitle}>{isLogin ? 'Acesse sua conta' : 'Crie sua conta'}</Text>

            <View style={styles.form}>
              {!isLogin && (
                <TextInput
                  style={styles.input}
                  placeholder="Nome"
                  placeholderTextColor={colors.textSecondary}
                  autoCapitalize="words"
                  value={name}
                  onChangeText={setName}
                />
              )}
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
              {!isLogin && (
                <TextInput
                  style={styles.input}
                  placeholder="Confirme sua senha"
                  placeholderTextColor={colors.textSecondary}
                  secureTextEntry
                  value={passwordConfirmation}
                  onChangeText={setPasswordConfirmation}
                />
              )}

              <Button
                title={isLogin ? 'Entrar' : 'Cadastrar'}
                onPress={isLogin ? handleLogin : handleRegister}
                isLoading={isLoading}
              />
              <Button
                title={isLogin ? 'Criar uma conta' : 'Já tenho uma conta'}
                onPress={() => setIsLogin(!isLogin)}
                variant="outline"
                style={{ marginTop: 12 }}
              />
            </View>
          </View>
        </View>

        <FeatureCarousel />
      </ScrollView>
    </SafeAreaView>
  );
}
