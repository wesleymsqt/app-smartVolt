import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Zap, ChevronRight, LayoutGrid } from 'lucide-react-native';

import { styles } from './styles';
import { colors } from '@/theme/colors';
import { Header } from '@/components/Header';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';
import { useGroups } from '@/context/GroupsContext';

export function Home() {
  const navigation = useNavigation<any>();
  const { groups } = useGroups();
  const [currentTab, setCurrentTab] = useState<TabTypes>('home');

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

  const dashboardData = useMemo(() => {
    let activeCount = 0;
    let totalCount = 0;
    let totalConsumptionValue = 0;

    groups.forEach((group) => {
      const devices = group.devices || [];
      totalCount += devices.length;

      devices.forEach((device) => {
        if (device.isOn) {
          activeCount++;
          const value = parseFloat(device.consumption.replace(/[^0-9.]/g, '')) || 0;
          totalConsumptionValue += value;
        }
      });
    });

    return {
      activeCount,
      totalCount,
      totalConsumption: `${totalConsumptionValue.toFixed(1)} kWh`,
    };
  }, [groups]);

  const getGroupSummary = (groupDevices: any[]) => {
    const active = groupDevices.filter((d) => d.isOn).length;
    return `${active}/${groupDevices.length} Ligados`;
  };

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

          <Text style={styles.heroValue}>{dashboardData.totalConsumption}</Text>
          <Text style={styles.heroSubtitle}>
            {dashboardData.activeCount} de {dashboardData.totalCount} aparelhos ligados
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Meus Ambientes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ManageGroups')}>
            <Text style={styles.seeAllText}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.groupsGrid}>
          {groups.length === 0 ? (
            <View style={styles.emptyState}>
              <LayoutGrid size={48} color={colors.borderMuted} />
              <Text style={styles.emptyStateText}>Nenhum grupo criado</Text>
              <TouchableOpacity onPress={() => navigation.navigate('CreateGroup')}>
                <Text style={{ color: colors.textSecondary, fontWeight: 'bold', marginTop: 8 }}>Criar agora</Text>
              </TouchableOpacity>
            </View>
          ) : (
            groups.map((group) => (
              <TouchableOpacity key={group.id} style={styles.groupCard} onPress={() => handleGroupDetails(group.id)}>
                <View style={styles.groupCardHeader}>
                  <Text style={styles.groupCardTitle} numberOfLines={1}>
                    {group.name}
                  </Text>
                  {group.devices.some((d) => d.isOn) && <View style={styles.activeDot} />}
                </View>

                <Text style={styles.groupCardStatus}>{getGroupSummary(group.devices)}</Text>

                <View style={styles.groupCardFooter}>
                  <Text style={styles.detailsLink}>Detalhes</Text>
                  <ChevronRight size={16} color={colors.textSecondary} />
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
