import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Search, Plus, Edit3, X } from 'lucide-react-native';

import { styles } from './styles';
import { colors } from '@/theme/colors';
import { Header } from '@/components/Header';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';

const initialDevices = [
  { id: '1', name: 'Ar-condicionado', group: 'Sala', consumption: '3.0 kWh', isOn: true },
  { id: '2', name: 'Lampada', group: 'Cozinha', consumption: '0.8 kWh', isOn: false },
  { id: '3', name: 'Ar-condicionado', group: 'Quarto', consumption: '3.0 kWh', isOn: true },
];

export function ManageDevices() {
  const navigation = useNavigation<any>();
  const [currentTab, setCurrentTab] = useState<TabTypes>('list');
  const [searchText, setSearchText] = useState('');
  const [devices, setDevices] = useState(initialDevices);

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

  const toggleSwitch = (id: string) => {
    setDevices((prev) => prev.map((device) => (device.id === id ? { ...device, isOn: !device.isOn } : device)));
  };

  const handleRemoveDevice = (id: string) => {
    setDevices((prev) => prev.filter((device) => device.id !== id));
  };

  const confirmRemove = (id: string) => {
    Alert.alert('Remover Aparelho', 'Tem certeza que deseja remover este aparelho da lista?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => handleRemoveDevice(id) },
    ]);
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
              <Text style={styles.deviceGroup}>{item.group}</Text>

              <View style={styles.deviceStatusRow}>
                <View style={[styles.consumptionBadge, { opacity: item.isOn ? 1 : 0.5 }]}>
                  <Text style={styles.consumptionText}>{item.consumption}</Text>
                </View>

                <View style={styles.switchWrapper}>
                  <Text style={[styles.statusLabel, { color: item.isOn ? colors.textPrimary : colors.borderMuted }]}>
                    {item.isOn ? 'ON' : 'OFF'}
                  </Text>

                  <Switch
                    trackColor={{ false: colors.borderMuted, true: colors.textPrimary }}
                    thumbColor={item.isOn ? colors.surface : colors.textPrimary}
                    onValueChange={() => toggleSwitch(item.id)}
                    value={item.isOn}
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
                    onDelete: (id: string) => handleRemoveDevice(id),
                  })
                }
              >
                <Edit3 size={18} color={colors.textPrimary} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton} onPress={() => confirmRemove(item.id)}>
                <X size={18} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
