import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { Header } from '@/components/Header';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';

export function EditDevice() {
  const navigation = useNavigation<any>();
  const [currentTab, setCurrentTab] = useState<TabTypes>('list');
  const [selectedGroup, setSelectedGroup] = useState<string>('Cozinha');

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Header title="Ar-Condicionado" onLogout={handleLogout} />

        <Text style={styles.label}>Novo Nome</Text>
        <TextInput style={styles.input} placeholder="Ar-Condicionado Sala" defaultValue="Ar-Condicionado Sala" />

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
          <TouchableOpacity style={styles.buttonSave} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonTextWhite}>Salvar Mudanças</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRemove} onPress={() => {}}>
            <Text style={styles.buttonTextWhite}>Remover Aparelho</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonCancel} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonTextDark}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
