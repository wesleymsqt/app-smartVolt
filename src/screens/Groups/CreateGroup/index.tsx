import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Save } from 'lucide-react-native';

import { styles } from './styles';
import { Header } from '@/components/Header';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';
import { Button } from '@/components/Button';
import { AppModal } from '@/components/Modal';
import { useGroups } from '@/context/GroupsContext';

export function CreateGroup() {
  const navigation = useNavigation<any>();
  const { addGroup, allDevices } = useGroups();

  const [groupName, setGroupName] = useState('');
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState<TabTypes>('grid');
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const handleSelectDevice = (id: string) => {
    setSelectedDevices((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]));
  };

  const handleTabChange = (tab: TabTypes) => {
    setCurrentTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'list') navigation.navigate('ManageDevices');
    if (tab === 'menu') navigation.navigate('Personalizations');
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      setErrorModalVisible(true);
      return;
    }

    const devicesToAdd = allDevices
      .filter((d) => selectedDevices.includes(d.id))
      .map((d) => ({
        ...d,
        isOn: false,
      }));

    const totalConsumption =
      devicesToAdd
        .reduce((sum, dev) => {
          const value = parseFloat(dev.consumption.replace(/[^0-9.]/g, '')) || 0;
          return sum + value;
        }, 0)
        .toFixed(1) + ' kWh';

    addGroup({
      name: groupName,
      connected: `${devicesToAdd.length}/${devicesToAdd.length}`,
      consumption: totalConsumption,
      devices: devicesToAdd,
    });

    navigation.goBack();
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
          {allDevices.length === 0 ? (
            <Text style={{ color: '#999', fontStyle: 'italic' }}>Nenhum dispositivo disponível para adicionar.</Text>
          ) : (
            allDevices.map((device) => (
              <TouchableOpacity
                key={device.id}
                style={[styles.deviceItem, selectedDevices.includes(device.id) && styles.deviceItemSelected]}
                onPress={() => handleSelectDevice(device.id)}
              >
                <Text style={styles.deviceName}>{device.name}</Text>

                <View style={styles.checkboxOuter}>
                  {selectedDevices.includes(device.id) && <View style={styles.checkboxInner} />}
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
