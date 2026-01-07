import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Camera } from 'lucide-react-native';

import { styles } from './styles';
import { Header } from '@/components/Header';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';
import { colors } from '@/theme/colors';

export function AddDevice() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { onAdd } = route.params || {};

  const [currentTab, setCurrentTab] = useState<TabTypes>('list');
  const [name, setName] = useState('');
  const [consumption, setConsumption] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('Nenhum');

  const groups = ['Cozinha', 'Quarto', 'Nenhum'];

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

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome do aparelho.');
      return;
    }

    const finalConsumption = consumption.trim() ? `${consumption} kWh` : '0.0 kWh';

    if (onAdd) {
      const newDevice = {
        id: String(new Date().getTime()),
        name,
        group: selectedGroup,
        consumption: finalConsumption,
        isOn: false,
      };
      onAdd(newDevice);
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Header title="Adicionar Aparelho" onLogout={handleLogout} />

        <Text style={styles.label}>Leitura do QR Code</Text>
        <TouchableOpacity style={styles.qrButton} activeOpacity={0.7}>
          <Text style={styles.qrText}>Toque para escanear</Text>
          <Camera color={colors.textPrimary} size={20} />
        </TouchableOpacity>

        <Text style={styles.label}>Nome do Aparelho</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Lampada da Sala"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Consumo Médio (kWh)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 0.8"
          placeholderTextColor="#9CA3AF"
          value={consumption}
          onChangeText={setConsumption}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Adicionar ao Grupo</Text>
        <View style={styles.groupContainer}>
          <TextInput style={styles.searchGroupInput} placeholder="Pesquisar grupo" placeholderTextColor="#9CA3AF" />

          {groups.map((group) => (
            <TouchableOpacity key={group} style={styles.radioRow} onPress={() => setSelectedGroup(group)}>
              <Text style={styles.radioLabel}>{group}</Text>
              <View style={styles.radioButton}>{selectedGroup === group && <View style={styles.radioSelected} />}</View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footerButtons}>
          <TouchableOpacity style={styles.buttonCancel} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
            <Text style={styles.buttonTextWhite}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
