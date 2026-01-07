import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Search, Plus, ChevronRight } from 'lucide-react-native';

import { styles } from './styles';
import { colors } from '@/theme/colors';
import { Header } from '@/components/Header';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';
import { useGroups } from '@/context/GroupsContext';
import type { Group } from '@/context/GroupsContext';

export function ManageGroups() {
  const navigation = useNavigation<any>();
  const { groups } = useGroups();
  const [currentTab, setCurrentTab] = useState<TabTypes>('grid');
  const [searchText, setSearchText] = useState('');

  const handleTabChange = (tab: TabTypes) => {
    setCurrentTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'grid') navigation.navigate('ManageGroups');
    if (tab === 'list') navigation.navigate('ManageDevices');
    if (tab === 'menu') navigation.navigate('Personalizations');
  };

  const handleGroupDetails = (groupId: string) => {
    navigation.navigate('GroupDetails', { groupId });
  };

  const getGroupStats = (group: Group) => {
    const devices = group.devices || [];
    const totalCount = devices.length;
    const activeCount = devices.filter((d) => d.isOn).length;

    const totalConsumption = devices
      .filter((d) => d.isOn)
      .reduce((acc, d) => {
        const value = parseFloat(d.consumption.replace(/[^0-9.]/g, '')) || 0;
        return acc + value;
      }, 0);

    return {
      statusText: `${activeCount}/${totalCount} Aparelhos Ligados`,
      consumptionText: `${totalConsumption.toFixed(1)} kWh`,
      isActive: activeCount > 0,
    };
  };

  const filteredGroups = groups.filter((g) => g.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header title="Gerenciar Grupos" onLogout={() => navigation.navigate('SignIn')} />

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

          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateGroup')}>
            <Plus size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {filteredGroups.map((group) => {
          const stats = getGroupStats(group);

          return (
            <TouchableOpacity key={group.id} style={styles.card} onPress={() => handleGroupDetails(group.id)}>
              <View style={styles.cardContent}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.groupName}>{group.name}</Text>
                  <Text style={styles.groupStatus}>{stats.statusText}</Text>

                  <View style={[styles.consumptionBadge, { opacity: stats.isActive ? 1 : 0.5 }]}>
                    <Text style={styles.consumptionText}>{stats.consumptionText}</Text>
                  </View>
                </View>

                {/* --- AQUI ESTÁ A LINHA DE VOLTA --- */}
                <View style={styles.verticalDivider} />

                <ChevronRight size={24} color={colors.textPrimary} />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
