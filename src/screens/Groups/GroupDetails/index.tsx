import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft, X, LogOut } from 'lucide-react-native'; 

import { styles } from './styles';
import { colors } from '@/theme/colors';
import { Logo } from '@/components/Logo'; 
import { BottomMenu, TabTypes } from '@/components/BottomMenu'; 
import { useGroups } from '@/context/GroupsContext';
import type { Device } from '@/context/GroupsContext';

export function GroupDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { groups, allDevices, removeGroup, addDeviceToGroup, removeDeviceFromGroup } = useGroups();
  const { groupId } = route.params || {};
  const group = groups.find(g => g.id === groupId);

  if (!group) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Grupo não encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [devices, setDevices] = useState<Device[]>(group.devices);
  const [currentTab, setCurrentTab] = useState<TabTypes>('grid');

  const totalConsumption = useMemo(() => {
    const sum = devices
      .filter(d => d.isOn)
      .reduce((acc, d) => acc + parseFloat(d.consumption.replace(' kWh', '')), 0);
    return sum.toFixed(1) + ' kWh';
  }, [devices]);

  const handleBack = () => navigation.goBack();

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

  const availableDevices = allDevices.filter(d => !devices.some(gd => gd.id === d.id));

  const handleAddDevice = (device: Device) => {
    addDeviceToGroup(groupId, device);
    setDevices([...devices, device]);
    setAddModalVisible(false);
  };

  const handleRemoveDevice = (deviceId: string) => {
    removeDeviceFromGroup(groupId, deviceId);
    setDevices(devices.filter(d => d.id !== deviceId));
  };

  const toggleSwitch = (id: string) => {
    setDevices(previousDevices =>
      previousDevices.map(device =>
        device.id === id ? { ...device, isOn: !device.isOn } : device
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.headerRow}>
          <Logo width={50} height={28} color={colors.textPrimary} />
          <TouchableOpacity onPress={handleBack}>
            <LogOut color={colors.textPrimary} size={24} style={{transform: [{ rotate: '180deg' }]}} />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>{group.name}</Text>
          <View style={styles.divider} />
          <Text style={styles.subtitle}>Consumo Total: {totalConsumption}</Text>
        </View>

        <Text style={styles.sectionTitle}>Aparelhos no Grupo</Text>

        {devices.map((item) => (
          <View key={item.id} style={styles.card}>
            <View>
              <Text style={styles.deviceTitle}>{item.name}</Text>
              <View style={styles.deviceRow}>
                <Text style={styles.consumptionText}>{item.consumption}</Text>
                
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>{item.isOn ? 'ON' : 'OFF'}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: colors.textPrimary }}
                        thumbColor={item.isOn ? "#fff" : "#f4f3f4"}
                        onValueChange={() => toggleSwitch(item.id)}
                        value={item.isOn}
                        style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                    />
                </View>
              </View>
            </View>

            <View style={styles.actionIcons}>
                <TouchableOpacity style={styles.iconButton} onPress={() => handleRemoveDevice(item.id)}>
                    <X size={20} color={colors.textPrimary} />
                </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.footerButtons}>
            <TouchableOpacity style={styles.buttonSecondary} onPress={() => setAddModalVisible(true)}>
                <Text style={styles.buttonTextWhite}>Adicionar Dispositivo</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.buttonPrimary} 
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.buttonTextWhite}>Excluir Grupo</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Deseja Excluir Grupo?</Text>
            
            <View style={styles.modalButtonsRow}>
                <TouchableOpacity 
                    style={styles.modalButtonConfirm}
                    onPress={handleDeleteGroup}
                >
                    <Text style={styles.buttonTextWhite}>Confirmar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.modalButtonCancel}
                    onPress={() => setModalVisible(false)}
                >
                    <Text style={styles.buttonTextWhite}>Cancelar</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Dispositivo</Text>
            <ScrollView>
              {availableDevices.map(device => (
                <TouchableOpacity
                  key={device.id}
                  onPress={() => handleAddDevice(device)}
                  style={{ padding: 10, borderBottomWidth: 1, borderColor: colors.border }}
                >
                  <Text style={styles.deviceTitle}>{device.name} - {device.consumption}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalButtonCancel}
              onPress={() => setAddModalVisible(false)}
            >
              <Text style={styles.buttonTextWhite}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}