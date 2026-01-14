import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Save, Target, Zap, Armchair } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';
import { AppModal } from '@/components/Modal';
import { colors } from '@/theme/colors';

type Group = {
  id: number;
  name: string;
  selected: boolean;
};

export function CreateGoal() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { onSave } = route.params || {};

  const [currentTab, setCurrentTab] = useState<TabTypes>('menu');
  const [name, setName] = useState('');
  const [limit, setLimit] = useState('');
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [notification, setNotification] = useState<boolean>(true);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api' : 'http://localhost:8000/api';

  useEffect(() => {
    async function getToken() {
      const storedToken = await AsyncStorage.getItem('@storage_Key');
      setToken(storedToken);
    }
    getToken();
  }, []);

  useEffect(() => {
    async function fetchGroups() {
      if (!token) return;
      try {
        const response = await fetch(`${apiUrl}/groups`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setGroups([
            { id: 0, name: 'Geral (Casa toda)', selected: true },
            ...data.map((group: Group) => ({ ...group, selected: false })),
          ]);
        } else {
          Alert.alert('Erro', 'Não foi possível carregar os grupos.');
        }
      } catch (error) {
        console.error('Failed to fetch groups:', error);
        Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      }
    }

    fetchGroups();
  }, [token]);

  const toggleGroup = (id: number) => {
    setGroups((prev) =>
      prev.map((group) => ({
        ...group,
        selected: group.id === id,
      })),
    );
  };

  const handleTabChange = (tab: TabTypes) => {
    setCurrentTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'grid') navigation.navigate('ManageGroups');
    if (tab === 'list') navigation.navigate('ManageDevices');
    if (tab === 'menu') navigation.navigate('Personalizations');
  };

  const handleSave = async () => {
    if (!name.trim() || !limit.trim()) {
      setErrorModalVisible(true);
      return;
    }

    const selectedGroup = groups.find((g) => g.selected);

    if (!selectedGroup) {
      Alert.alert('Erro', 'Selecione um ambiente para a meta.');
      return;
    }

    setIsLoading(true);

    try {
      let endpoint = '';
      let body: any = {
        name,
        target_kwh: parseFloat(limit),
        period,
      };

      if (selectedGroup.id === 0) {
        endpoint = `${apiUrl}/user/usage-goal`;
      } else {
        endpoint = `${apiUrl}/groups/${selectedGroup.id}/usage-goal`;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Meta criada com sucesso!');
        navigation.goBack();
      } else {
        const data = await response.json();
        Alert.alert('Erro', data.message || 'Não foi possível criar a meta.');
      }
    } catch (error) {
      console.error('Failed to create goal:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header title="Nova Meta" onBack={() => navigation.goBack()} />

        <View style={styles.heroContainer}>
          <Text style={styles.heroLabel}>Definir Limite</Text>
          <View style={styles.heroInputWrapper}>
            <TextInput
              style={styles.heroInput}
              placeholder="0"
              placeholderTextColor={colors.borderMuted}
              keyboardType="numeric"
              value={limit}
              onChangeText={setLimit}
              maxLength={4}
            />
            <Text style={styles.heroUnit}>kWh</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.inputRow}>
            <Target size={20} color={colors.textSecondary} style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Nome da Meta</Text>
              <TextInput
                style={styles.simpleInput}
                placeholder="Ex: Economia Mensal"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Período de Medição</Text>
        </View>
        <View style={styles.segmentedControl}>
          {[
            { label: 'Diário', value: 'daily' },
            { label: 'Semanal', value: 'weekly' },
            { label: 'Mensal', value: 'monthly' },
          ].map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[styles.segmentButton, period === option.value && styles.segmentButtonActive]}
              onPress={() => setPeriod(option.value as any)}
            >
              <Text style={[styles.segmentText, period === option.value && styles.segmentTextActive]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Selecione o Ambiente</Text>
        </View>
        <View style={styles.itemsGrid}>
          {groups.map((group) => (
            <TouchableOpacity
              key={group.id}
              style={[styles.itemCard, group.selected && styles.itemCardSelected]}
              onPress={() => toggleGroup(group.id)}
            >
              <View style={[styles.iconBox, group.selected && styles.iconBoxSelected]}>
                <Armchair size={20} color={group.selected ? '#FFF' : colors.textPrimary} />
              </View>
              <Text style={[styles.itemCardText, group.selected && styles.itemCardTextSelected]}>{group.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.toggleRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Zap size={20} color={colors.textSecondary} style={{ marginRight: 12 }} />
            <Text style={styles.toggleLabel}>Receber notificações de alerta</Text>
          </View>
          <Switch
            trackColor={{ false: colors.borderMuted, true: colors.textSecondary }}
            thumbColor={colors.surface}
            onValueChange={setNotification}
            value={notification}
          />
        </View>

        <View style={styles.footerButtons}>
          <Button
            title="Salvar Meta"
            variant="secondary"
            onPress={handleSave}
            icon={<Save size={20} color="#FFF" />}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>

      <AppModal visible={errorModalVisible} onClose={() => setErrorModalVisible(false)} title="Dados Incompletos">
        <Text style={styles.modalMessage}>Por favor, preencha o nome da meta e o limite para continuar.</Text>
        <View style={{ width: '100%' }}>
          <Button title="Entendi" variant="secondary" onPress={() => setErrorModalVisible(false)} />
        </View>
      </AppModal>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
