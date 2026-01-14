import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Save } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';
import { Header } from '@/components/Header';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';
import { Button } from '@/components/Button';
import { AppModal } from '@/components/Modal';

type Group = {
  id: number;
  name: string;
};

export function AddDevice() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { onAdd } = route.params || {};

  const [currentTab, setCurrentTab] = useState<TabTypes>('list');
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const apiUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api' : 'http://localhost:8000/api';

  useEffect(() => {
    async function getToken() {
      const storedToken = await AsyncStorage.getItem('@storage_Key');
      setToken(storedToken);
    }
    getToken();
  }, []);

  useEffect(() => {
    async function fetchGroups() {
      if (!token) return;
      try {
        const response = await fetch(`${apiUrl}/groups`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('API response data:', data);
        if (response.ok) {
          setGroups(data);
        } else {
          Alert.alert('Erro', 'Não foi possível carregar os grupos.');
        }
      } catch (error) {
        console.error('Failed to fetch groups:', error);
        Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      }
    }

    fetchGroups();
  }, [token]);

  const handleTabChange = (tab: TabTypes) => {
    setCurrentTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'grid') navigation.navigate('ManageGroups');
    if (tab === 'list') navigation.navigate('ManageDevices');
    if (tab === 'menu') navigation.navigate('Personalizations');
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSave = async () => {
    if (!key.trim() || !name.trim()) {
      setErrorModalVisible(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/devices/link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ key, name, group_id: selectedGroupId }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Aparelho vinculado com sucesso!');
        navigation.goBack();
      } else {
        const data = await response.json();
        Alert.alert('Erro', data.message || 'Não foi possível vincular o aparelho.');
      }
    } catch (error) {
      console.error('Failed to link device:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Header
          title="Adicionar Aparelho"
          onLogout={() => navigation.navigate('SignIn')}
          onBack={() => navigation.goBack()}
        />

        <Text style={styles.label}>Identificador do Aparelho</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: ANCDTE12341"
          placeholderTextColor="#9CA3AF"
          value={key}
          onChangeText={setKey}
        />

        <Text style={styles.label}>Nome do Aparelho</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Lampada da Sala"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Adicionar ao Grupo</Text>
        <View style={styles.groupContainer}>
          <TextInput style={styles.searchGroupInput} placeholder="Pesquisar grupo" placeholderTextColor="#9CA3AF" />

          {groups.map((group) => (
            <TouchableOpacity key={group.id} style={styles.radioRow} onPress={() => setSelectedGroupId(group.id)}>
              <Text style={styles.radioLabel}>{group.name}</Text>
              <View style={styles.radioButton}>
                {selectedGroupId === group.id && <View style={styles.radioSelected} />}
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.radioRow} onPress={() => setSelectedGroupId(null)}>
            <Text style={styles.radioLabel}>Nenhum</Text>
            <View style={styles.radioButton}>{selectedGroupId === null && <View style={styles.radioSelected} />}</View>
          </TouchableOpacity>
        </View>

        <View style={styles.footerButtons}>
          <View style={{ flex: 1 }}>
            <Button title="Cancelar" variant="outline" onPress={handleCancel} />
          </View>

          <View style={{ width: 16 }} />

          <View style={{ flex: 1 }}>
            <Button
              title="Salvar"
              variant="secondary"
              onPress={handleSave}
              icon={<Save size={20} color="#FFF" />}
              isLoading={isLoading}
            />
          </View>
        </View>
      </ScrollView>

      <AppModal visible={errorModalVisible} onClose={() => setErrorModalVisible(false)} title="Dados Incompletos">
        <Text style={styles.modalMessage}>Por favor, informe o identificador e o nome do aparelho para continuar.</Text>
        <View style={{ width: '100%' }}>
          <Button title="Entendi" variant="secondary" onPress={() => setErrorModalVisible(false)} />
        </View>
      </AppModal>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
