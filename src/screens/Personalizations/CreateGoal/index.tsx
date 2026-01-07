import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Save } from 'lucide-react-native';

import { styles } from './styles';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';
import { colors } from '@/theme/colors';

export function CreateGoal() {
  const navigation = useNavigation<any>();

  const [currentTab, setCurrentTab] = useState<TabTypes>('menu');
  const [name, setName] = useState('');
  const [limit, setLimit] = useState('');
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [notification, setNotification] = useState<boolean>(true);
  const [searchText, setSearchText] = useState('');

  const [items, setItems] = useState([
    { id: '1', name: 'Cozinha', selected: true },
    { id: '2', name: 'Quarto', selected: false },
    { id: '3', name: 'TV da sala', selected: false },
    { id: '4', name: 'Escritório', selected: false },
  ]);

  const toggleItem = (id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)));
  };

  const filteredItems = items.filter((i) => i.name.toLowerCase().includes(searchText.toLowerCase()));

  const handleTabChange = (tab: TabTypes) => {
    setCurrentTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'grid') navigation.navigate('ManageGroups');
    if (tab === 'list') navigation.navigate('ManageDevices');
    if (tab === 'menu') navigation.navigate('Personalizations');
  };

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Header title="Criar Meta" onBack={() => navigation.goBack()} />

        <Text style={styles.label}>Nome da Meta</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Meta da Cozinha"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Limite de Consumo (kWh)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 150"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={limit}
          onChangeText={setLimit}
        />

        <Text style={styles.label}>Consumo</Text>
        <View style={styles.groupContainer}>
          {[
            { label: 'Diário', value: 'daily' },
            { label: 'Semanal', value: 'weekly' },
            { label: 'Mensal', value: 'monthly' },
          ].map((option) => (
            <TouchableOpacity key={option.value} style={styles.itemRow} onPress={() => setPeriod(option.value as any)}>
              <Text style={styles.itemLabel}>{option.label}</Text>
              <View style={styles.radioButton}>{period === option.value && <View style={styles.radioSelected} />}</View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Adicionar Grupo/Dispositivo</Text>
        <View style={styles.groupContainer}>
          <TextInput
            style={styles.searchGroupInput}
            placeholder="Pesquisar grupo"
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />

          {filteredItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.itemRow} onPress={() => toggleItem(item.id)}>
              <Text style={styles.itemLabel}>{item.name}</Text>

              <View style={[styles.checkboxButton, item.selected && styles.checkboxActiveBorder]}>
                {item.selected && <View style={styles.checkboxSelected} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Notificação</Text>
        <View style={[styles.groupContainer, { paddingVertical: 4 }]}>
          <TouchableOpacity style={styles.itemRow} onPress={() => setNotification(true)}>
            <Text style={styles.itemLabel}>Sim</Text>
            <View style={styles.radioButton}>{notification && <View style={styles.radioSelected} />}</View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.itemRow, { borderBottomWidth: 0 }]} onPress={() => setNotification(false)}>
            <Text style={styles.itemLabel}>Não</Text>
            <View style={styles.radioButton}>{!notification && <View style={styles.radioSelected} />}</View>
          </TouchableOpacity>
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

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
