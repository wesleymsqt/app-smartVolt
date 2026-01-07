import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LogOut } from 'lucide-react-native';

import { styles } from './styles';
import { colors } from '@/theme/colors';
import { Logo } from '@/components/Logo';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';
import { useGroups } from '@/context/GroupsContext';

const availableDevices = [
    { id: '1', name: 'Ar-condicionado', consumption: '3.5 kWh' },
    { id: '2', name: 'Lampada do Teto', consumption: '0.8 kWh' },
    { id: '3', name: 'Smart TV', consumption: '2.0 kWh' },
];

export function CreateGroup() {
  const navigation = useNavigation<any>();
  const { addGroup } = useGroups();
  const [groupName, setGroupName] = useState('');
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState<TabTypes>('grid');

  const handleSelectDevice = (id: string) => {
    setSelectedDevices(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleTabChange = (tab: TabTypes) => {
    setCurrentTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'list') navigation.navigate('ManageDevices');
    if (tab === 'menu') navigation.navigate('Personalizations');
  };

  const handleCreateGroup = () => {
    if (groupName.trim() && selectedDevices.length > 0) {
      const devices = selectedDevices.map(id => {
        const dev = availableDevices.find(d => d.id === id);
        return {
          id,
          name: dev?.name || '',
          consumption: dev?.consumption || '0.0 kWh',
          isOn: false
        };
      });
      const totalConsumption = devices.reduce((sum, dev) => {
        const value = parseFloat(dev.consumption.replace(' kWh', ''));
        return sum + value;
      }, 0).toFixed(1) + ' kWh';
      addGroup({
        name: groupName,
        connected: `${selectedDevices.length}/${availableDevices.length}`,
        consumption: totalConsumption,
        devices
      });
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.headerRow}>
          <Logo width={50} height={28} color={colors.textPrimary} />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LogOut color={colors.textPrimary} size={24} style={{transform: [{ rotate: '180deg' }]}} />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>Criar Novo Grupo</Text>
          <View style={styles.divider} />
        </View>

        <Text style={styles.label}>Nome do Grupo</Text>
        <TextInput 
            style={styles.input}
            placeholder="Ex: Sala de Estar, Escritório"
            value={groupName}
            onChangeText={setGroupName}
        />

        <Text style={styles.label}>Dispositivos</Text>
        <View style={styles.listContainer}>
            {availableDevices.map(device => (
                <TouchableOpacity 
                    key={device.id} 
                    style={styles.deviceItem}
                    onPress={() => handleSelectDevice(device.id)}
                >
                    <Text style={styles.deviceName}>{device.name}</Text>
                    
                    <View style={styles.radioOuter}>
                        {selectedDevices.includes(device.id) && <View style={styles.radioInner} />}
                    </View>
                </TouchableOpacity>
            ))}
        </View>

        <View style={styles.footerButtons}>
            <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonTextBlack}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonFilled} onPress={handleCreateGroup}>
                <Text style={styles.buttonTextWhite}>Criar Grupo</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}