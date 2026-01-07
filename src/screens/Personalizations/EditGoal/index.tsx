import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Save, Target, Zap, Armchair, Trash2 } from 'lucide-react-native';

import { styles } from './styles';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';
import { AppModal } from '@/components/Modal';
import { colors } from '@/theme/colors';

export function EditGoal() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { goal, onEdit, onDelete } = route.params || {};

  const [currentTab, setCurrentTab] = useState<TabTypes>('menu');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [name, setName] = useState(goal?.name || '');
  const [limit, setLimit] = useState(goal?.value ? goal.value.replace(/[^0-9.]/g, '') : '');

  const getInitialPeriod = () => {
    if (goal?.label?.includes('semanal')) return 'weekly';
    if (goal?.label?.includes('diário')) return 'daily';
    return 'monthly';
  };
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>(getInitialPeriod());

  const [notification, setNotification] = useState<boolean>(goal?.alert ?? true);

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

    if (onEdit) {
      const updatedGoal = {
        ...goal,
        name,
        value: `${limit} kWh`,
        label: period === 'monthly' ? 'Consumo mensal' : period === 'weekly' ? 'Consumo semanal' : 'Consumo diário',
        alert: notification,
      };
      onEdit(updatedGoal);
    }
    navigation.goBack();
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(goal.id);
    }
    setDeleteModalVisible(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header title="Editar Meta" onBack={() => navigation.goBack()} />

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
                placeholderTextColor={colors.borderMuted}
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
            title="Salvar Alterações"
            variant="secondary"
            onPress={handleSave}
            icon={<Save size={20} color="#FFF" />}
          />
          <View style={{ height: 12 }} />
          <Button
            title="Excluir Meta"
            variant="outline"
            onPress={() => setDeleteModalVisible(true)}
            icon={<Trash2 size={20} color={colors.textPrimary} />}
          />
        </View>
      </ScrollView>

      <AppModal visible={errorModalVisible} onClose={() => setErrorModalVisible(false)} title="Dados Incompletos">
        <Text style={styles.modalMessage}>Por favor, preencha o nome da meta e o limite para continuar.</Text>
        <View style={{ width: '100%' }}>
          <Button title="Entendi" variant="secondary" onPress={() => setErrorModalVisible(false)} />
        </View>
      </AppModal>

      <AppModal visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)} title="Excluir Meta">
        <Text style={styles.modalMessage}>Tem certeza que deseja remover esta meta permanentemente?</Text>
        <View style={styles.modalButtonsRow}>
          <View style={{ flex: 1 }}>
            <Button title="Cancelar" variant="outline" onPress={() => setDeleteModalVisible(false)} />
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 1 }}>
            <Button title="Excluir" variant="secondary" onPress={handleConfirmDelete} />
          </View>
        </View>
      </AppModal>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
