import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Search, Plus, Edit3, Trash2 } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';
import { colors } from '@/theme/colors';
import { Header } from '@/components/Header';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';
import { AppModal } from '@/components/Modal';
import { Button } from '@/components/Button';

type Device = {
  id: number;
  name: string;
  group_id: number;
  is_on: number;
  consumption: number | null;
};

type Group = {
  id: number;
  name: string;
};

export function ManageDevices() {
  const navigation = useNavigation<any>();
  const [currentTab, setCurrentTab] = useState<TabTypes>('list');
  const [searchText, setSearchText] = useState('');
  const [devices, setDevices] = useState<Device[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [token, setToken] = useState<string | null>(null);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<number | null>(null);

  const apiUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api' : 'http://localhost:8000/api';

  const fetchData = useCallback(async () => {
    if (!token) return;
    try {
      const [devicesResponse, groupsResponse] = await Promise.all([
        fetch(`${apiUrl}/devices`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${apiUrl}/groups`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const devicesData = await devicesResponse.json();
      const groupsData = await groupsResponse.json();

      if (devicesResponse.ok) {
        setDevices(devicesData);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar os aparelhos.');
      }

      if (groupsResponse.ok) {
        setGroups(groupsData);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar os grupos.');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  }, [token, apiUrl]);

  useEffect(() => {
    async function getToken() {
      const storedToken = await AsyncStorage.getItem('@storage_Key');
      setToken(storedToken);
    }
    getToken();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  const getGroupName = (groupId: number) => {
    const group = groups.find((g) => g.id === groupId);
    return group ? group.name : 'Sem grupo';
  };

  const handleTabChange = (tab: TabTypes) => {
    setCurrentTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'grid') navigation.navigate('ManageGroups');
    if (tab === 'list') navigation.navigate('ManageDevices');
    if (tab === 'menu') navigation.navigate('Personalizations');
  };

  const handleLogout = () => {
    navigation.navigate('SignIn');
  };

  const toggleSwitch = (id: number) => {
    setDevices((prev) =>
      prev.map((device) => (device.id === id ? { ...device, is_on: device.is_on === 1 ? 0 : 1 } : device)),
    );
  };

  const handleRemoveDevice = (id: number) => {
    setDevices((prev) => prev.filter((device) => device.id !== id));
  };

  const confirmRemove = (id: number) => {
    setDeviceToDelete(id);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (deviceToDelete) {
      try {
        const response = await fetch(`${apiUrl}/devices/${deviceToDelete}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          Alert.alert('Sucesso', 'Aparelho removido com sucesso!');
          fetchData();
        } else {
          const data = await response.json();
          Alert.alert('Erro', data.message || 'Não foi possível remover o aparelho.');
        }
      } catch (error) {
        console.error('Failed to delete device:', error);
        Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      }
    }
    setDeleteModalVisible(false);
    setDeviceToDelete(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header title="Gerenciar Aparelhos" onLogout={handleLogout} />

        <Text style={styles.sectionTitle}>Aparelhos Disponíveis</Text>

        <View style={styles.searchContainer}>
          <View style={styles.inputWrapper}>
            <Search size={20} color={colors.borderMuted} />
            <TextInput
              style={styles.input}
              placeholder="Pesquisar aparelho"
              placeholderTextColor={colors.borderMuted}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              navigation.navigate('AddDevice', {
                onAdd: (newDevice: any) => {
                  setDevices((prev) => [...prev, newDevice]);
                },
              })
            }
          >
            <Plus size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {devices.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardLeftContent}>
              <Text style={styles.deviceName}>{item.name}</Text>
              <Text style={styles.deviceGroup}>{getGroupName(item.group_id)}</Text>

              <View style={styles.deviceStatusRow}>
                <View style={[styles.consumptionBadge, { opacity: item.is_on ? 1 : 0.5 }]}>
                  <Text style={styles.consumptionText}>{item.is_on ? `${item.consumption || 0} kWh` : '0 kWh'}</Text>
                </View>

                <View style={styles.switchWrapper}>
                  <Text style={[styles.statusLabel, { color: item.is_on ? colors.textPrimary : colors.borderMuted }]}>
                    {item.is_on ? 'ON' : 'OFF'}
                  </Text>

                  <Switch
                    trackColor={{ false: colors.borderMuted, true: colors.textPrimary }}
                    thumbColor={item.is_on ? colors.surface : colors.textPrimary}
                    onValueChange={() => toggleSwitch(item.id)}
                    value={!!item.is_on}
                    style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                  />
                </View>
              </View>
            </View>

            <View style={styles.cardRightContent}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() =>
                  navigation.navigate('EditDevice', {
                    device: item,
                    onEdit: (updatedDevice: any) => {
                      setDevices((prev) => prev.map((d) => (d.id === updatedDevice.id ? updatedDevice : d)));
                    },
                    onDelete: (id: number) => handleRemoveDevice(id),
                  })
                }
              >
                <Edit3 size={18} color={colors.textPrimary} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton} onPress={() => confirmRemove(item.id)}>
                <Trash2 size={18} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <AppModal visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)} title="Remover Aparelho">
        <Text style={{ textAlign: 'center', marginBottom: 24, color: '#666' }}>
          Tem certeza que deseja remover este aparelho da lista?
        </Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Button title="Cancelar" variant="outline" onPress={() => setDeleteModalVisible(false)} />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Remover" variant="secondary" onPress={handleConfirmDelete} />
          </View>
        </View>
      </AppModal>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
