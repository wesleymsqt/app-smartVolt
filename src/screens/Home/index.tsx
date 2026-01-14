import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Zap, ChevronRight, LayoutGrid } from 'lucide-react-native';
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
  total_consumption: number | null;
  devices_count: number;
  devices_on_count: number;
};

export function Home() {
  const navigation = useNavigation<any>();
  const [currentTab, setCurrentTab] = useState<TabTypes>('home');
  const [token, setToken] = useState<string | null>(null);
  const [summaryData, setSummaryData] = useState<{ total_consumption: number; top_groups: Group[] } | null>(null);

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
      const response = await fetch(`${apiUrl}/dashboard/summary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setSummaryData(data);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar o resumo do dashboard.');
      }
    } catch (error) {
      console.error('Failed to fetch dashboard summary:', error);
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
      countText: `${activeCount}/${totalCount} Ligados`,
      consumptionText: `${totalConsumption.toFixed(1)} kWh`,
      isActive: activeCount > 0,
    };
  };

  const totalActiveDevices = useMemo(() => {
    return summaryData?.top_groups.reduce((acc, group) => acc + group.devices_on_count, 0) || 0;
  }, [summaryData]);

  const totalDevices = useMemo(() => {
    return summaryData?.top_groups.reduce((acc, group) => acc + group.devices_count, 0) || 0;
  }, [summaryData]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header title="Visão Geral" onLogout={() => navigation.navigate('SignIn')} />

        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View style={styles.iconCircle}>
              <Zap size={24} color="#FFF" fill="#FFF" />
            </View>
            <Text style={styles.heroTitle}>Consumo Atual</Text>
          </View>

          <Text style={styles.heroValue}>
            {summaryData?.total_consumption ? `${summaryData.total_consumption.toFixed(1)} kWh` : '0.0 kWh'}
          </Text>
          <Text style={styles.heroSubtitle}>
            {totalActiveDevices} de {totalDevices} aparelhos ligados
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Meus Ambientes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ManageGroups')}>
            <Text style={styles.seeAllText}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.groupsGrid}>
          {summaryData?.top_groups.length === 0 ? (
            <View style={styles.emptyState}>
              <LayoutGrid size={48} color={colors.borderMuted} />
              <Text style={styles.emptyStateText}>Nenhum grupo criado</Text>
              <TouchableOpacity onPress={() => navigation.navigate('CreateGroup')}>
                <Text style={{ color: colors.textSecondary, fontWeight: 'bold', marginTop: 8 }}>Criar agora</Text>
              </TouchableOpacity>
            </View>
          ) : (
            summaryData?.top_groups.map((group) => {
              const stats = getGroupStats(group);

              return (
                <TouchableOpacity
                  key={group.id}
                  style={styles.groupCard}
                  onPress={() => handleGroupDetails(group.id.toString())}
                >
                  <View style={styles.groupCardHeader}>
                    <Text style={styles.groupCardTitle} numberOfLines={1}>
                      {group.name}
                    </Text>
                    {stats.isActive && <View style={styles.activeDot} />}
                  </View>

                  <View style={styles.groupMetaRow}>
                    <Text style={styles.groupCardStatus}>{stats.countText}</Text>
                    <View style={styles.dotSeparator} />
                    <Text style={styles.groupCardConsumption}>{stats.consumptionText}</Text>
                  </View>

                  <View style={styles.groupCardFooter}>
                    <Text style={styles.detailsLink}>Detalhes</Text>
                    <ChevronRight size={16} color={colors.textSecondary} />
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
