import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Save, Clock, ChevronDown, ChevronUp, CalendarDays } from 'lucide-react-native';

import { styles } from './styles';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';
import { colors } from '@/theme/colors';

// Tipagem básica para nossos dados mockados
type Device = { id: string; name: string; isActive: boolean };
type Group = { id: string; name: string; expanded: boolean; devices: Device[] };

export function CreateRoutine() {
  const navigation = useNavigation<any>();
  const [currentTab, setCurrentTab] = useState<TabTypes>('menu');

  // Estados do Formulário
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Mock de Grupos e Dispositivos
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

  const handleSave = () => {
    // Aqui você implementaria a lógica de salvar
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header title="Criar Rotina" onBack={() => navigation.goBack()} />

        {/* Nome da Rotina */}
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

        {/* Seleção de Dias */}
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

        {/* Horários */}
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

        {/* Lista de Dispositivos (Acordeão) */}
        <Text style={[styles.label, { marginTop: 8 }]}>Ações dos Dispositivos</Text>
        <View style={styles.deviceListContainer}>
          {groups.map((group, index) => (
            <View key={group.id} style={[styles.groupItem, index !== groups.length - 1 && styles.borderBottom]}>
              {/* Cabeçalho do Grupo (Clicável para expandir) */}
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

              {/* Lista de Dispositivos do Grupo (Visível se expanded) */}
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

        {/* Footer Buttons */}
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
      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
