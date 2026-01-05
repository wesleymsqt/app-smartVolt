import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Search, Plus, ChevronRight, LogOut } from 'lucide-react-native';

import { styles } from './styles';
import { colors } from '@/theme/colors';
import { Logo } from '@/components/Logo';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';

const groupsData = [
  { id: '1', name: 'Cozinha', connected: '4/4', consumption: '5.8 kWh' },
  { id: '2', name: 'Quarto', connected: '3/3', consumption: '5.8 kWh' },
  { id: '3', name: 'Sala', connected: '3/5', consumption: '5.8 kWh' },
];

export function ManageGroups() {
  const navigation = useNavigation<any>();
  const [currentTab, setCurrentTab] = useState<TabTypes>('grid');
  const [searchText, setSearchText] = useState('');

  const handleTabChange = (tab: TabTypes) => {
    setCurrentTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'list') navigation.navigate('ManageDevices');
  };

  const handleLogout = () => {
    navigation.navigate('SignIn');
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
          <Text style={styles.pageTitle}>Gerenciar Grupos</Text>
          <View style={styles.divider} />
        </View>

        <Text style={styles.sectionTitle}>Grupos Disponíveis</Text>

        <View style={styles.searchContainer}>
          <View style={styles.inputWrapper}>
            <Search size={20} color={colors.borderMuted} />
            <TextInput
              style={styles.input}
              placeholder="Pesquisar grupo"
              placeholderTextColor={colors.borderMuted}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {groupsData.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>{item.connected} Aparelhos Conectados</Text>
              <Text style={styles.cardFooter}>Consumo Total: {item.consumption}</Text>
            </View>
            <ChevronRight size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
