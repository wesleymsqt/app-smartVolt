import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Search, Plus, LogOut, Edit3, Bell, BellOff } from 'lucide-react-native';

import { styles } from './styles';
import { colors } from '@/theme/colors';
import { Logo } from '@/components/Logo';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';

type InternalTab = 'metas' | 'rotinas';

export function Personalizations() {
  const navigation = useNavigation<any>();
  const [currentMenuTab, setCurrentMenuTab] = useState<TabTypes>('menu');
  const [activeTab, setActiveTab] = useState<InternalTab>('metas');
  const [searchText, setSearchText] = useState('');

  const [routines, setRoutines] = useState([
    {
      id: '1',
      name: 'Modo Cinema',
      time: '20:00 - 00:00',
      days: 'Sex, Sáb, Dom',
      action: 'Liga TV + Ar Condicionado',
      isOn: true,
    },
    {
      id: '2',
      name: 'Despertar',
      time: '06:00 - 06:15',
      days: 'Seg, Ter, Qua, Qui, Sex',
      action: 'Liga Luz Quarto (Suave)',
      isOn: false,
    },
    {
      id: '3',
      name: 'Economia',
      time: '09:00 - 18:00',
      days: 'Todos os dias',
      action: 'Desliga Ar-condicionados',
      isOn: true,
    },
  ]);

  const metas = [
    { id: '1', name: 'Meta Geral', value: '186 kWh', label: 'Consumo mensal', alert: true },
    { id: '2', name: 'Grupo Quarto', value: '8 kWh', label: 'Consumo diário', alert: false },
    { id: '3', name: 'Grupo Cozinha', value: '120 kWh', label: 'Consumo mensal', alert: true },
  ];

  const handleBottomTabChange = (tab: TabTypes) => {
    setCurrentMenuTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'grid') navigation.navigate('ManageGroups');
    if (tab === 'list') navigation.navigate('ManageDevices');
  };

  const handleLogout = () => {
    navigation.navigate('SignIn');
  };

  const toggleRoutine = (id: string) => {
    setRoutines((prev) => prev.map((r) => (r.id === id ? { ...r, isOn: !r.isOn } : r)));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.headerRow}>
          <Logo width={50} height={28} color={colors.textPrimary} />
          <TouchableOpacity onPress={handleLogout}>
            <LogOut color={colors.textPrimary} size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>Personalizações</Text>
          <View style={styles.divider} />
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'metas' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('metas')}
        >
          <Text style={styles.tabText}>Metas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'rotinas' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('rotinas')}
        >
          <Text style={styles.tabText}>Rotinas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.inputWrapper}>
            <Search size={20} color={colors.textPrimary} opacity={0.5} />
            <TextInput
              style={styles.input}
              placeholder={activeTab === 'metas' ? 'Pesquisar meta' : 'Pesquisar rotina'}
              placeholderTextColor={colors.textPrimary}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {activeTab === 'metas' &&
            metas.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  {item.alert ? (
                    <Bell size={20} color={colors.textPrimary} />
                  ) : (
                    <BellOff size={20} color={colors.textPrimary} />
                  )}
                </View>

                <Text style={styles.metaValue}>{item.value}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={styles.metaLabel}>{item.label}</Text>
                  <TouchableOpacity>
                    <Edit3 size={20} color={colors.textPrimary} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

          {activeTab === 'rotinas' &&
            routines.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Switch
                    trackColor={{ false: colors.border, true: colors.textPrimary }}
                    thumbColor={item.isOn ? colors.surface : colors.textPrimary}
                    onValueChange={() => toggleRoutine(item.id)}
                    value={item.isOn}
                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                  />
                </View>

                <Text style={styles.routineTime}>{item.time}</Text>

                <View style={{ alignItems: 'flex-end', marginTop: -20, marginBottom: 10 }}>
                  <TouchableOpacity>
                    <Edit3 size={20} color={colors.textPrimary} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.routineDays}>{item.days}</Text>
                <Text style={styles.routineAction}>Ação: {item.action}</Text>
              </View>
            ))}
        </ScrollView>
      </View>

      <BottomMenu activeTab={currentMenuTab} onTabChange={handleBottomTabChange} />
    </SafeAreaView>
  );
}
