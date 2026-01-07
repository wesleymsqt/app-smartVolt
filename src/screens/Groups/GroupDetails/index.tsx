import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { X, Plus, Trash2 } from 'lucide-react-native';

import { styles } from './styles';
import { colors } from '@/theme/colors';
import { Header } from '@/components/Header';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';
import { AppModal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { useGroups } from '@/context/GroupsContext';
import type { Device } from '@/context/GroupsContext';

export function GroupDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { groups, allDevices, removeGroup, addDeviceToGroup, removeDeviceFromGroup, updateDeviceStatus } = useGroups();

  const { groupId } = route.params || {};
  const group = groups.find((g) => g.id === groupId);

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

  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabTypes>('grid');

  const devices = group.devices || [];

  const totalConsumption = useMemo(() => {
    const sum = devices
      .filter((d) => d.isOn)
      .reduce((acc, d) => {
        const value = parseFloat(d.consumption.replace(/[^0-9.]/g, '')) || 0;
        return acc + value;
      }, 0);
    return sum.toFixed(1) + ' kWh';
  }, [devices]);

  const handleTabChange = (tab: TabTypes) => {
    setCurrentTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'list') navigation.navigate('ManageDevices');
    if (tab === 'menu') navigation.navigate('Personalizations');
  };

  const handleDeleteGroup = () => {
    if (groupId) {
      removeGroup(groupId);
      setModalVisible(false);
      navigation.navigate('ManageGroups');
    }
  };

  const availableDevices = allDevices.filter((d) => !devices.some((gd) => gd.id === d.id));

  const handleAddDevice = (device: Device) => {
    addDeviceToGroup(groupId, device);
    setAddModalVisible(false);
  };

  const handleRemoveDevice = (deviceId: string) => {
    removeDeviceFromGroup(groupId, deviceId);
  };

  const toggleSwitch = (deviceId: string) => {
    updateDeviceStatus(deviceId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header title={group.name} onLogout={() => navigation.navigate('SignIn')} onBack={() => navigation.goBack()} />

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Consumo Total do Grupo:</Text>
          <Text style={styles.infoValue}>{totalConsumption}</Text>
        </View>

        <Text style={styles.sectionTitle}>Aparelhos Conectados</Text>

        {devices.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardLeftContent}>
              <Text style={styles.deviceTitle}>{item.name}</Text>

              <View style={[styles.consumptionBadge, { opacity: item.isOn ? 1 : 0.5 }]}>
                <Text style={styles.consumptionText}>{item.isOn ? item.consumption : '0 kWh'}</Text>
              </View>
            </View>

            <View style={styles.cardRightContent}>
              <View style={styles.switchWrapper}>
                <Text style={[styles.statusLabel, { color: item.isOn ? colors.textPrimary : '#999' }]}>
                  {item.isOn ? 'ON' : 'OFF'}
                </Text>
                <Switch
                  trackColor={{ false: colors.borderMuted, true: colors.textPrimary }}
                  thumbColor={item.isOn ? '#fff' : colors.surface}
                  onValueChange={() => toggleSwitch(item.id)}
                  value={item.isOn}
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
            title="Adicionar Dispositivo"
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

      <AppModal visible={addModalVisible} onClose={() => setAddModalVisible(false)} title="Adicionar ao Grupo">
        <ScrollView style={{ maxHeight: 200, width: '100%' }}>
          {availableDevices.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#999', marginVertical: 20 }}>Nenhum aparelho disponível.</Text>
          ) : (
            availableDevices.map((device) => (
              <TouchableOpacity key={device.id} onPress={() => handleAddDevice(device)} style={styles.modalItem}>
                <Text style={styles.deviceTitle}>{device.name}</Text>
                <Text style={{ fontSize: 12, color: '#666' }}>{device.consumption}</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        <View style={{ marginTop: 16, width: '100%' }}>
          <Button title="Fechar" variant="outline" onPress={() => setAddModalVisible(false)} />
        </View>
      </AppModal>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
