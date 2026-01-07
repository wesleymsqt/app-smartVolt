import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Save, Target, Zap, Armchair } from 'lucide-react-native';

import { styles } from './styles';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';
import { AppModal } from '@/components/Modal';
import { colors } from '@/theme/colors';

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

  const [groups, setGroups] = useState([
    { id: '1', name: 'Geral (Casa toda)', selected: true },
    { id: '2', name: 'Cozinha', selected: false },
    { id: '3', name: 'Quarto', selected: false },
    { id: '4', name: 'Sala de Estar', selected: false },
    { id: '5', name: 'Escritório', selected: false },
  ]);

  const toggleGroup = (id: string) => {
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

  const handleSave = () => {
    if (!name.trim() || !limit.trim()) {
      setErrorModalVisible(true);
      return;
    }

    if (onSave) {
      const selectedGroup = groups.find((g) => g.selected)?.name || 'Geral';

      const newGoal = {
        id: new Date().getTime().toString(),
        name,
        value: `${limit} kWh`,
        label: period === 'monthly' ? 'Consumo mensal' : period === 'weekly' ? 'Consumo semanal' : 'Consumo diário',
        alert: notification,
      };

      onSave(newGoal);
    }

    navigation.goBack();
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
          <Button title="Salvar Meta" variant="secondary" onPress={handleSave} icon={<Save size={20} color="#FFF" />} />
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
