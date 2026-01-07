import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import { styles } from './styles';
import { Header } from '@/components/Header';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';

export function EditDevice() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { device, onEdit, onDelete } = route.params || {};

  const [currentTab, setCurrentTab] = useState<TabTypes>('list');
  const [name, setName] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('Nenhum');

  useEffect(() => {
    if (device) {
      setName(device.name);
      setSelectedGroup(device.group || 'Nenhum');
    }
  }, [device]);

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

  const handleSave = () => {
    if (onEdit && device) {
      onEdit({
        ...device,
        name,
        group: selectedGroup,
      });
    }
    navigation.goBack();
  };

  const handleRemove = () => {
    if (!device) return;

    Alert.alert('Remover Aparelho', 'Tem certeza que deseja remover este aparelho permanentemente?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => {
          if (onDelete) {
            onDelete(device.id);
          }
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Header title={name || 'Editar Dispositivo'} onLogout={handleLogout} />

        <Text style={styles.label}>Novo Nome</Text>
        <TextInput style={styles.input} placeholder="Nome do dispositivo" value={name} onChangeText={setName} />

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
          <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
            <Text style={styles.buttonTextWhite}>Salvar Mudanças</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRemove} onPress={handleRemove}>
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
