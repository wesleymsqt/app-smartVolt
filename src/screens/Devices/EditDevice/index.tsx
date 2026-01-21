import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Trash2, Save } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';
import { Header } from '@/components/Header';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';
import { AppModal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { colors } from '@/theme/colors';

type Group = {
  id: number;
  name: string;
};

export function EditDevice() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { device } = route.params || {};

  const [currentTab, setCurrentTab] = useState<TabTypes>('list');
  const [name, setName] = useState<string>('');
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const apiUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api' : 'http://localhost:8000/api';

  useEffect(() => {
    if (device) {
      setName(device.name);
      setSelectedGroupId(device.group_id);
    }
  }, [device]);

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
        if (response.ok) {
          setGroups(data.groups || data);
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

  const handleSave = async () => {
    if (!name.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/devices/${device.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, group_id: selectedGroupId }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Aparelho atualizado com sucesso!');
        navigation.goBack();
      } else {
        const data = await response.json();
        Alert.alert('Erro', data.message || 'Não foi possível atualizar o aparelho.');
      }
    } catch (error) {
      console.error('Failed to update device:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = () => {
    // Implement delete logic here
    setDeleteModalVisible(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Header
          title={name || 'Editar Dispositivo'}
          onLogout={() => navigation.navigate('SignIn')}
          onBack={() => navigation.goBack()}
        />

        <Text style={styles.label}>Novo Nome</Text>
        <TextInput style={styles.input} placeholder="Nome do dispositivo" value={name} onChangeText={setName} />

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
          <Button
            title="Salvar Mudanças"
            variant="secondary"
            onPress={handleSave}
            icon={<Save size={20} color="#FFF" />}
            isLoading={isLoading}
          />

          <Button
            title="Remover Aparelho"
            variant="outline"
            onPress={() => setDeleteModalVisible(true)}
            icon={<Trash2 size={20} color={colors.textPrimary} />}
          />
        </View>
      </ScrollView>

      <AppModal visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)} title="Remover Aparelho">
        <Text style={styles.modalMessage}>Tem certeza que deseja remover este aparelho permanentemente?</Text>
        <View style={styles.modalButtonsRow}>
          <View style={{ flex: 1 }}>
            <Button title="Cancelar" variant="outline" onPress={() => setDeleteModalVisible(false)} />
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 1 }}>
            <Button title="Remover" variant="secondary" onPress={handleConfirmDelete} />
          </View>
        </View>
      </AppModal>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
