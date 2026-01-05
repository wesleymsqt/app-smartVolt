import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Search, Plus, LogOut, Edit3, X } from 'lucide-react-native';

import { styles } from './styles';
import { colors } from '@/theme/colors';
import { Logo } from '@/components/Logo';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';

const initialDevices = [
  { id: '1', name: 'Ar-condicionado', consumption: '3.0 kWh', isOn: true },
  { id: '2', name: 'Lampada', consumption: '0.8 kWh', isOn: false },
  { id: '3', name: 'Ar-condicionado', consumption: '3.0 kWh', isOn: true },
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Logo width={50} height={28} color={colors.textPrimary} />
          <TouchableOpacity onPress={handleLogout}>
            <LogOut color={colors.textPrimary} size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>Gerenciar Aparelhos</Text>
          <View style={styles.divider} />
        </View>

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

          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {devices.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardLeftContent}>
              <Text style={styles.deviceName}>{item.name}</Text>

              <View style={styles.deviceStatusRow}>
                <Text style={styles.consumptionText}>{item.consumption}</Text>
                <Switch
                  trackColor={{ false: colors.borderMuted, true: colors.textPrimary }}
                  thumbColor={item.isOn ? colors.surface : colors.textPrimary}
                  onValueChange={() => toggleSwitch(item.id)}
                  value={item.isOn}
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                />
              </View>
            </View>

            <View style={styles.cardRightContent}>
              <TouchableOpacity style={styles.iconButton}>
                <Edit3 size={20} color={colors.textPrimary} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton}>
                <X size={20} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
