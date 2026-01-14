import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Save } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';
import { Header } from '@/components/Header';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';
import { Button } from '@/components/Button';
import { AppModal } from '@/components/Modal';

type Device = {
  id: number;
  name: string;
};

export function CreateGroup() {
  const navigation = useNavigation<any>();
  const [groupName, setGroupName] = useState('');
  const [selectedDeviceIds, setSelectedDeviceIds] = useState<number[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabTypes>('grid');
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
    async function fetchDevices() {
      if (!token) return;
      try {
        const response = await fetch(`${apiUrl}/devices`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setDevices(data);
        } else {
          Alert.alert('Erro', 'Não foi possível carregar os aparelhos.');
        }
      } catch (error) {
        console.error('Failed to fetch devices:', error);
        Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      }
    }
    fetchDevices();
  }, [token]);

  const handleSelectDevice = (id: number) => {
    setSelectedDeviceIds((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]));
  };

  const handleTabChange = (tab: TabTypes) => {
    setCurrentTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'list') navigation.navigate('ManageDevices');
    if (tab === 'menu') navigation.navigate('Personalizations');
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      setErrorModalVisible(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: groupName, device_ids: selectedDeviceIds }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Grupo criado com sucesso!');
        navigation.goBack();
      } else {
        const data = await response.json();
        Alert.alert('Erro', data.message || 'Não foi possível criar o grupo.');
      }
    } catch (error) {
      console.error('Failed to create group:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header
          title="Criar Novo Grupo"
          onLogout={() => navigation.navigate('SignIn')}
          onBack={() => navigation.goBack()}
        />

        <Text style={styles.label}>Nome do Grupo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Sala de Estar, Escritório"
          value={groupName}
          onChangeText={setGroupName}
        />

        <Text style={styles.label}>Selecionar Dispositivos</Text>
        <View style={styles.listContainer}>
          {devices.length === 0 ? (
            <Text style={{ color: '#999', fontStyle: 'italic' }}>Nenhum dispositivo disponível para adicionar.</Text>
          ) : (
            devices.map((device) => (
              <TouchableOpacity
                key={device.id}
                style={[styles.deviceItem, selectedDeviceIds.includes(device.id) && styles.deviceItemSelected]}
                onPress={() => handleSelectDevice(device.id)}
              >
                <Text style={styles.deviceName}>{device.name}</Text>

                <View style={styles.checkboxOuter}>
                  {selectedDeviceIds.includes(device.id) && <View style={styles.checkboxInner} />}
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        <View style={styles.footerButtons}>
          <View style={{ flex: 1 }}>
            <Button title="Cancelar" variant="outline" onPress={() => navigation.goBack()} />
          </View>

          <View style={{ width: 16 }} />

          <View style={{ flex: 1 }}>
            <Button
              title="Criar Grupo"
              variant="secondary"
              onPress={handleCreateGroup}
              icon={<Save size={20} color="#FFF" />}
              isLoading={isLoading}
            />
          </View>
        </View>
      </ScrollView>

      <AppModal visible={errorModalVisible} onClose={() => setErrorModalVisible(false)} title="Nome Obrigatório">
        <Text style={styles.modalMessage}>Por favor, insira um nome para o grupo.</Text>
        <View style={{ width: '100%' }}>
          <Button title="Ok" variant="secondary" onPress={() => setErrorModalVisible(false)} />
        </View>
      </AppModal>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
