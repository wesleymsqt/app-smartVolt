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

export function ManageGroups() {
  const navigation = useNavigation<any>();
  const { groups } = useGroups();
  const [currentTab, setCurrentTab] = useState<TabTypes>('grid');
  const [searchText, setSearchText] = useState('');

  const handleTabChange = (tab: TabTypes) => {
    setCurrentTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'list') navigation.navigate('ManageDevices');
    if (tab === 'menu') navigation.navigate('Personalizations');
  };

  const handleLogout = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header title="Gerenciar Grupos" onLogout={handleLogout} />

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

        {groups.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate('GroupDetails', { groupId: item.id })}
          >
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
