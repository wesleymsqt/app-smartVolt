import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { X, Plus, Trash2 } from 'lucide-react-native';
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
  consumption: number | null;
  is_on: number;
};

type Group = {
  id: number;
  name: string;
  user_id: number;
  created_at: string | null;
  updated_at: string | null;
  total_consumption: number | null;
  devices: Device[];
};

export function GroupDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { groupId } = route.params || {};

  const [group, setGroup] = useState<Group | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [selectedDeviceIds, setSelectedDeviceIds] = useState<number[]>([]);
  const [currentTab, setCurrentTab] = useState<TabTypes>('grid');

  const apiUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api' : 'http://localhost:8000/api';

  const fetchData = useCallback(async () => {
    if (!token || !groupId) return;
    try {
      const [groupResponse, devicesResponse] = await Promise.all([
        fetch(`${apiUrl}/groups/${groupId}`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${apiUrl}/devices`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const groupData = await groupResponse.json();
      const devicesData = await devicesResponse.json();

      if (groupResponse.ok) {
        setGroup(groupData);
        setSelectedDeviceIds(groupData.devices.map((d: Device) => d.id));
      } else {
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do grupo.');
      }

      if (devicesResponse.ok) {
        setAllDevices(devicesData);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar os aparelhos.');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  }, [token, groupId, apiUrl]);

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

  if (!group) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Detalhes" onLogout={() => navigation.navigate('SignIn')} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Grupo não encontrado</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
            <Text style={{ color: colors.textPrimary }}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleTabChange = (tab: TabTypes) => {
    setCurrentTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'list') navigation.navigate('ManageDevices');
    if (tab === 'menu') navigation.navigate('Personalizations');
  };

  const handleDeleteGroup = async () => {
    if (!group || !token) return;
    try {
      const response = await fetch(`${apiUrl}/groups/${group.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Grupo removido com sucesso!');
        setModalVisible(false);
        navigation.navigate('ManageGroups');
      } else {
        const data = await response.json();
        Alert.alert('Erro', data.message || 'Não foi possível remover o grupo.');
      }
    } catch (error) {
      console.error('Failed to delete group:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  const handleRemoveDevice = async (deviceId: number) => {
    if (!group || !token) return;
    try {
      const response = await fetch(`${apiUrl}/groups/${group.id}/unlink-device/${deviceId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Aparelho desvinculado com sucesso!');
        fetchData();
      } else {
        const data = await response.json();
        Alert.alert('Erro', data.message || 'Não foi possível desvincular o aparelho.');
      }
    } catch (error) {
      console.error('Failed to unlink device:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  const handleUpdateGroupDevices = async () => {
    if (!group || !token) return;
    try {
      const response = await fetch(`${apiUrl}/groups/${group.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: group.name, device_ids: selectedDeviceIds }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Aparelhos do grupo atualizados com sucesso!');
        setAddModalVisible(false);
        fetchData();
      } else {
        const data = await response.json();
        Alert.alert('Erro', data.message || 'Não foi possível atualizar os aparelhos do grupo.');
      }
    } catch (error) {
      console.error('Failed to update group devices:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  const handleSelectDevice = (id: number) => {
    setSelectedDeviceIds((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]));
  };

  const toggleSwitch = (deviceId: number) => {
    // Implement toggle switch logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header title={group.name} onLogout={() => navigation.navigate('SignIn')} onBack={() => navigation.goBack()} />

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Consumo Total do Grupo:</Text>
          <Text style={styles.infoValue}>{group.total_consumption || 0} kWh</Text>
        </View>

        <Text style={styles.sectionTitle}>Aparelhos Conectados</Text>

        {group.devices.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardLeftContent}>
              <Text style={styles.deviceTitle}>{item.name}</Text>

              <View style={[styles.consumptionBadge, { opacity: item.is_on ? 1 : 0.5 }]}>
                <Text style={styles.consumptionText}>{item.is_on ? `${item.consumption || 0} kWh` : '0 kWh'}</Text>
              </View>
            </View>

            <View style={styles.cardRightContent}>
              <View style={styles.switchWrapper}>
                <Text style={[styles.statusLabel, { color: item.is_on ? colors.textPrimary : '#999' }]}>
                  {item.is_on ? 'ON' : 'OFF'}
                </Text>
                <Switch
                  trackColor={{ false: colors.borderMuted, true: colors.textPrimary }}
                  thumbColor={item.is_on ? '#fff' : colors.surface}
                  onValueChange={() => toggleSwitch(item.id)}
                  value={!!item.is_on}
                  style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                />
              </View>

              <View style={styles.verticalDivider} />

              <TouchableOpacity style={styles.iconButton} onPress={() => handleRemoveDevice(item.id)}>
                <X size={20} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.footerButtons}>
          <Button
            title="Editar Aparelhos do Grupo"
            variant="secondary"
            onPress={() => setAddModalVisible(true)}
            icon={<Plus size={20} color="#FFF" />}
          />

          <Button
            title="Excluir Grupo"
            variant="outline"
            onPress={() => setModalVisible(true)}
            icon={<Trash2 size={20} color={colors.textPrimary} />}
          />
        </View>
      </ScrollView>

      <AppModal visible={modalVisible} onClose={() => setModalVisible(false)} title={`Excluir "${group.name}"?`}>
        <Text style={styles.modalMessage}>Todos os aparelhos serão removidos deste grupo.</Text>

        <View style={styles.modalButtonsRow}>
          <View style={{ flex: 1 }}>
            <Button title="Cancelar" variant="outline" onPress={() => setModalVisible(false)} />
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 1 }}>
            <Button title="Confirmar" variant="secondary" onPress={handleDeleteGroup} />
          </View>
        </View>
      </AppModal>

      <AppModal visible={addModalVisible} onClose={() => setAddModalVisible(false)} title="Editar Aparelhos do Grupo">
        <ScrollView style={{ maxHeight: 200, width: '100%' }}>
          {allDevices.map((device) => (
            <TouchableOpacity
              key={device.id}
              onPress={() => handleSelectDevice(device.id)}
              style={[styles.modalItem, selectedDeviceIds.includes(device.id) && styles.deviceItemSelected]}
            >
              <Text style={styles.deviceTitle}>{device.name}</Text>
              <View style={styles.checkboxOuter}>
                {selectedDeviceIds.includes(device.id) && <View style={styles.checkboxInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ marginTop: 16, width: '100%' }}>
          <Button title="Salvar" variant="secondary" onPress={handleUpdateGroupDevices} />
        </View>
      </AppModal>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
