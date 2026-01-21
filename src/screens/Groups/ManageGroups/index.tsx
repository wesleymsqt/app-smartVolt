import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Search, Plus, ChevronRight } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';
import { colors } from '@/theme/colors';
import { Header } from '@/components/Header';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';

type Group = {
  id: number;
  name: string;
  user_id: number;
  created_at: string | null;
  updated_at: string | null;
  devices_count: number;
  devices_on_count: number;
  total_consumption: number | null;
};

export function ManageGroups() {
  const navigation = useNavigation<any>();
  const [groups, setGroups] = useState<Group[]>([]);
  const [currentTab, setCurrentTab] = useState<TabTypes>('grid');
  const [searchText, setSearchText] = useState('');
  const [token, setToken] = useState<string | null>(null);

  const apiUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api' : 'http://localhost:8000/api';

  useEffect(() => {
    async function getToken() {
      const storedToken = await AsyncStorage.getItem('@storage_Key');
      setToken(storedToken);
    }
    getToken();
  }, []);

  const fetchData = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch(`${apiUrl}/groups`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setGroups(data);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar os grupos.');
      }
    } catch (error) {
      console.error('Failed to fetch groups:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  }, [token, apiUrl]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

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
    const totalCount = group.devices_count;
    const activeCount = group.devices_on_count;
    const totalConsumption = group.total_consumption || 0;

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
            <TouchableOpacity
              key={group.id}
              style={styles.card}
              onPress={() => handleGroupDetails(group.id.toString())}
            >
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
