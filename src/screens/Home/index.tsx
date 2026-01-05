import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Grid, ChevronRight, ChevronDown } from 'lucide-react-native';

import { styles } from './styles';
import { colors } from '@/theme/colors';
import { Header } from '@/components/Header';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';

export function Home() {
  const navigation = useNavigation<any>();
  const [currentTab, setCurrentTab] = useState<TabTypes>('home');
  const [devices, setDevices] = useState({
    ac: true,
    lamp: true,
    tv: true,
  });

  function handleLogout() {
    navigation.navigate('SignIn');
  }

  function handleTabChange(tab: TabTypes) {
    setCurrentTab(tab);

    if (tab === 'grid') navigation.navigate('ManageGroups');
    if (tab === 'list') navigation.navigate('ManageDevices');
  }

  const toggleDevice = (device: keyof typeof devices) => {
    setDevices((prev) => ({ ...prev, [device]: !prev[device] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header userName="Anderson" onLogout={handleLogout} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Grupos de Aparelhos</Text>
          <Grid color={colors.textPrimary} size={24} />
        </View>

        <TouchableOpacity style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Cozinha (4/4)</Text>
            <ChevronRight color={colors.textPrimary} size={20} />
          </View>
        </TouchableOpacity>

        <View style={styles.card}>
          <TouchableOpacity style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Quarto (3/3)</Text>
            <ChevronDown color={colors.textPrimary} size={20} />
          </TouchableOpacity>

          <View style={styles.cardBody}>
            <View style={styles.deviceRow}>
              <Text style={styles.deviceName}>Ar-condicionado</Text>
              <Switch
                trackColor={{ false: colors.border, true: colors.textPrimary }}
                thumbColor={devices.ac ? colors.surface : colors.textPrimary}
                ios_backgroundColor={colors.border}
                onValueChange={() => toggleDevice('ac')}
                value={devices.ac}
              />
            </View>

            <View style={styles.deviceRow}>
              <Text style={styles.deviceName}>Lampada</Text>
              <Switch
                trackColor={{ false: colors.border, true: colors.textPrimary }}
                thumbColor={devices.lamp ? colors.surface : colors.textPrimary}
                onValueChange={() => toggleDevice('lamp')}
                value={devices.lamp}
              />
            </View>

            <View style={styles.deviceRow}>
              <Text style={styles.deviceName}>Televisão</Text>
              <Switch
                trackColor={{ false: colors.border, true: colors.textPrimary }}
                thumbColor={devices.tv ? colors.surface : colors.textPrimary}
                onValueChange={() => toggleDevice('tv')}
                value={devices.tv}
              />
            </View>

            <View style={styles.consumptionContainer}>
              <View style={[styles.consumptionFill, { width: '73%' }]} />
              <Text style={styles.consumptionText}>Consumo: 11/15 kWh</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
