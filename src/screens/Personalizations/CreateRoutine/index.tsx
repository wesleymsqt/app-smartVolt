import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Save, Clock, ChevronDown, ChevronUp, CalendarDays } from 'lucide-react-native';

import { styles } from './styles';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';
import { AppModal } from '@/components/Modal';
import { colors } from '@/theme/colors';

type Device = { id: string; name: string; isActive: boolean };
type Group = { id: string; name: string; expanded: boolean; devices: Device[] };

export function CreateRoutine() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { onSave } = route.params || {};

  const [currentTab, setCurrentTab] = useState<TabTypes>('menu');
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Quarto',
      expanded: true,
      devices: [
        { id: 'd1', name: 'TV', isActive: true },
        { id: 'd2', name: 'Lâmpada Principal', isActive: false },
        { id: 'd3', name: 'Ar-Condicionado', isActive: true },
      ],
    },
    {
      id: '2',
      name: 'Sala de Estar',
      expanded: false,
      devices: [
        { id: 'd4', name: 'Lustre', isActive: false },
        { id: 'd5', name: 'Fita LED', isActive: true },
      ],
    },
    {
      id: '3',
      name: 'Cozinha',
      expanded: false,
      devices: [{ id: 'd6', name: 'Cafeteira', isActive: false }],
    },
  ]);

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const fullWeekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const handleTabChange = (tab: TabTypes) => {
    setCurrentTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'grid') navigation.navigate('ManageGroups');
    if (tab === 'list') navigation.navigate('ManageDevices');
    if (tab === 'menu') navigation.navigate('Personalizations');
  };

  const toggleDay = (dayIndex: number) => {
    const dayStr = String(dayIndex);
    setSelectedDays((prev) => (prev.includes(dayStr) ? prev.filter((d) => d !== dayStr) : [...prev, dayStr]));
  };

  const toggleGroupExpand = (groupId: string) => {
    setGroups((prev) => prev.map((g) => (g.id === groupId ? { ...g, expanded: !g.expanded } : g)));
  };

  const toggleDeviceState = (groupId: string, deviceId: string) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          devices: g.devices.map((d) => (d.id === deviceId ? { ...d, isActive: !d.isActive } : d)),
        };
      }),
    );
  };

  const getDaysLabel = () => {
    if (selectedDays.length === 7) return 'Todos os dias';
    if (selectedDays.length === 0) return 'Nunca';
    return selectedDays
      .map((i) => fullWeekDays[Number(i)])
      .sort((a, b) => fullWeekDays.indexOf(a) - fullWeekDays.indexOf(b))
      .join(', ');
  };

  const getActionLabel = () => {
    const activeDevices: string[] = [];
    groups.forEach((g) => {
      g.devices.forEach((d) => {
        if (d.isActive) activeDevices.push(d.name);
      });
    });

    if (activeDevices.length === 0) return 'Nenhuma ação';
    if (activeDevices.length <= 2) return `Liga ${activeDevices.join(' + ')}`;
    return `Liga ${activeDevices[0]} + ${activeDevices.length - 1} outros`;
  };

  const handleSave = () => {
    if (!name.trim()) {
      setErrorModalVisible(true);
      return;
    }

    if (onSave) {
      const newRoutine = {
        id: new Date().getTime().toString(),
        name,
        time: startTime && endTime ? `${startTime} - ${endTime}` : 'Dia todo',
        days: getDaysLabel(),
        action: getActionLabel(),
        isOn: true,
      };
      onSave(newRoutine);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header title="Criar Rotina" onBack={() => navigation.goBack()} />

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome da Rotina</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Modo Leitura"
            placeholderTextColor={colors.borderMuted}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <CalendarDays size={20} color={colors.textSecondary} style={{ marginRight: 8 }} />
            <Text style={styles.label}>Repetir nos dias</Text>
          </View>
          <View style={styles.daysContainer}>
            {weekDays.map((day, index) => {
              const isSelected = selectedDays.includes(String(index));
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.dayButton, isSelected && styles.dayButtonActive]}
                  onPress={() => toggleDay(index)}
                >
                  <Text style={[styles.dayText, isSelected && styles.dayTextActive]}>{day}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Clock size={20} color={colors.textSecondary} style={{ marginRight: 8 }} />
            <Text style={styles.label}>Horário</Text>
          </View>
          <View style={styles.timeRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.subLabel}>Início</Text>
              <TextInput
                style={styles.timeInput}
                placeholder="00:00"
                placeholderTextColor={colors.borderMuted}
                keyboardType="numeric"
                maxLength={5}
                value={startTime}
                onChangeText={setStartTime}
              />
            </View>
            <View style={{ width: 16 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.subLabel}>Fim</Text>
              <TextInput
                style={styles.timeInput}
                placeholder="00:00"
                placeholderTextColor={colors.borderMuted}
                keyboardType="numeric"
                maxLength={5}
                value={endTime}
                onChangeText={setEndTime}
              />
            </View>
          </View>
        </View>

        <Text style={[styles.label, { marginTop: 8 }]}>Ações dos Dispositivos</Text>
        <View style={styles.deviceListContainer}>
          {groups.map((group, index) => (
            <View key={group.id} style={[styles.groupItem, index !== groups.length - 1 && styles.borderBottom]}>
              <TouchableOpacity
                style={styles.groupHeader}
                onPress={() => toggleGroupExpand(group.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.groupTitle}>{group.name}</Text>
                {group.expanded ? (
                  <ChevronUp size={20} color={colors.textPrimary} />
                ) : (
                  <ChevronDown size={20} color={colors.borderMuted} />
                )}
              </TouchableOpacity>

              {group.expanded && (
                <View style={styles.devicesContainer}>
                  {group.devices.map((device) => (
                    <View key={device.id} style={styles.deviceRow}>
                      <Text style={styles.deviceName}>{device.name}</Text>
                      <View style={styles.switchWrapper}>
                        <Text style={[styles.statusText, { color: device.isActive ? colors.textSecondary : '#999' }]}>
                          {device.isActive ? 'ON' : 'OFF'}
                        </Text>
                        <Switch
                          trackColor={{ false: colors.borderMuted, true: colors.textSecondary }}
                          thumbColor={colors.surface}
                          onValueChange={() => toggleDeviceState(group.id, device.id)}
                          value={device.isActive}
                          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.footerButtons}>
          <View style={{ flex: 1 }}>
            <Button title="Cancelar" variant="outline" onPress={() => navigation.goBack()} />
          </View>
          <View style={{ width: 16 }} />
          <View style={{ flex: 1 }}>
            <Button title="Salvar" variant="secondary" onPress={handleSave} icon={<Save size={20} color="#FFF" />} />
          </View>
        </View>
      </ScrollView>

      <AppModal visible={errorModalVisible} onClose={() => setErrorModalVisible(false)} title="Dados Incompletos">
        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 20 }}>
          Por favor, dê um nome para sua rotina antes de salvar.
        </Text>
        <View style={{ width: '100%' }}>
          <Button title="Entendi" variant="secondary" onPress={() => setErrorModalVisible(false)} />
        </View>
      </AppModal>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
