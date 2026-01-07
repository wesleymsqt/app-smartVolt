import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Search, Plus, Edit3, Bell, BellOff } from 'lucide-react-native';

import { styles } from './styles';
import { colors } from '@/theme/colors';
import { Header } from '@/components/Header';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';

type InternalTab = 'metas' | 'rotinas';

export function Personalizations() {
  const navigation = useNavigation<any>();
  const [currentMenuTab, setCurrentMenuTab] = useState<TabTypes>('menu');
  const [activeTab, setActiveTab] = useState<InternalTab>('metas');
  const [searchText, setSearchText] = useState('');

  const [metas, setMetas] = useState([
    { id: '1', name: 'Meta Geral', value: '186 kWh', label: 'Consumo mensal', alert: true },
    { id: '2', name: 'Grupo Quarto', value: '8 kWh', label: 'Consumo diário', alert: false },
    { id: '3', name: 'Grupo Cozinha', value: '120 kWh', label: 'Consumo mensal', alert: true },
  ]);

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

  const handleBottomTabChange = (tab: TabTypes) => {
    setCurrentMenuTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'grid') navigation.navigate('ManageGroups');
    if (tab === 'list') navigation.navigate('ManageDevices');
    if (tab === 'menu') navigation.navigate('Personalizations');
  };

  const handleCreate = () => {
    if (activeTab === 'metas') {
      navigation.navigate('CreateGoal', {
        onSave: (newGoal: any) => {
          setMetas((prev) => [...prev, newGoal]);
        },
      });
    } else if (activeTab === 'rotinas') {
      navigation.navigate('CreateRoutine', {
        onSave: (newRoutine: any) => {
          setRoutines((prev) => [...prev, newRoutine]);
        },
      });
    }
  };

  const handleEdit = (goal: any) => {
    navigation.navigate('EditGoal', {
      goal,
      onEdit: (updatedGoal: any) => {
        setMetas((prev) => prev.map((m) => (m.id === updatedGoal.id ? updatedGoal : m)));
      },
      onDelete: (goalId: string) => {
        setMetas((prev) => prev.filter((m) => m.id !== goalId));
      },
    });
  };

  const handleEditRoutine = (routine: any) => {
    navigation.navigate('EditRoutine', {
      routine,
      onEdit: (updatedRoutine: any) => {
        setRoutines((prev) => prev.map((r) => (r.id === updatedRoutine.id ? updatedRoutine : r)));
      },
      onDelete: (routineId: string) => {
        setRoutines((prev) => prev.filter((r) => r.id !== routineId));
      },
    });
  };

  const toggleRoutine = (id: string) => {
    setRoutines((prev) => prev.map((r) => (r.id === id ? { ...r, isOn: !r.isOn } : r)));
  };

  const filteredMetas = metas.filter((m) => m.name.toLowerCase().includes(searchText.toLowerCase()));
  const filteredRoutines = routines.filter((r) => r.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header title="Personalizações" onLogout={() => navigation.navigate('SignIn')} />

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'metas' && styles.activeTabButton]}
            onPress={() => setActiveTab('metas')}
          >
            <Text style={[styles.tabText, activeTab === 'metas' && styles.activeTabText]}>Metas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'rotinas' && styles.activeTabButton]}
            onPress={() => setActiveTab('rotinas')}
          >
            <Text style={[styles.tabText, activeTab === 'rotinas' && styles.activeTabText]}>Rotinas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.inputWrapper}>
            <Search size={20} color={colors.borderMuted} />
            <TextInput
              style={styles.input}
              placeholder={activeTab === 'metas' ? 'Pesquisar meta' : 'Pesquisar rotina'}
              placeholderTextColor={colors.borderMuted}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleCreate}>
            <Plus size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {activeTab === 'metas' &&
          filteredMetas.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <TouchableOpacity>
                  {item.alert ? (
                    <Bell size={20} color={colors.textSecondary} fill={colors.textSecondary} />
                  ) : (
                    <BellOff size={20} color={colors.borderMuted} />
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.metaContent}>
                <Text style={styles.metaValue}>{item.value}</Text>
                <Text style={styles.metaLabel}>{item.label}</Text>
              </View>

              <TouchableOpacity style={styles.cardFooter} onPress={() => handleEdit(item)}>
                <Text style={styles.detailsLink}>Editar Meta</Text>
                <Edit3 size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          ))}

        {activeTab === 'rotinas' &&
          filteredRoutines.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Switch
                  trackColor={{ false: colors.borderMuted, true: colors.textSecondary }}
                  thumbColor={colors.surface}
                  onValueChange={() => toggleRoutine(item.id)}
                  value={item.isOn}
                />
              </View>

              <Text style={styles.routineTime}>{item.time}</Text>
              <Text style={styles.routineDays}>{item.days}</Text>

              <View style={styles.divider} />

              <Text style={styles.routineActionLabel}>Ação:</Text>
              <Text style={styles.routineAction}>{item.action}</Text>

              <TouchableOpacity style={[styles.cardFooter, { marginTop: 12 }]} onPress={() => handleEditRoutine(item)}>
                <Text style={styles.detailsLink}>Editar Rotina</Text>
                <Edit3 size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>

      <BottomMenu activeTab={currentMenuTab} onTabChange={handleBottomTabChange} />
    </SafeAreaView>
  );
}
