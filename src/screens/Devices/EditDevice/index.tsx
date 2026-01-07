import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Trash2, Save } from 'lucide-react-native';

import { styles } from './styles';
import { Header } from '@/components/Header';
import { BottomMenu, TabTypes } from '@/components/BottomMenu';
import { AppModal } from '@/components/Modal';
import { colors } from '@/theme/colors';

export function EditDevice() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { device, onEdit, onDelete } = route.params || {};

  const [currentTab, setCurrentTab] = useState<TabTypes>('list');
  const [name, setName] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('Nenhum');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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

  const handleConfirmDelete = () => {
    if (onDelete && device) {
      onDelete(device.id);
    }
    setDeleteModalVisible(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Header
          title={name || 'Editar Dispositivo'}
          onLogout={() => navigation.navigate('SignIn')}
          onBack={() => navigation.goBack()}
        />

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
            <Save size={20} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={styles.buttonTextWhite}>Salvar Mudanças</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRemove} onPress={() => setDeleteModalVisible(true)}>
            <Trash2 size={20} color={colors.textPrimary} style={{ marginRight: 8 }} />
            <Text style={styles.buttonTextDark}>Remover Aparelho</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AppModal visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)} title="Remover Aparelho">
        <Text style={styles.modalMessage}>Tem certeza que deseja remover este aparelho permanentemente?</Text>
        <View style={styles.modalButtonsRow}>
          <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setDeleteModalVisible(false)}>
            <Text style={styles.buttonTextDark}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButtonConfirm} onPress={handleConfirmDelete}>
            <Text style={styles.buttonTextWhite}>Remover</Text>
          </TouchableOpacity>
        </View>
      </AppModal>

      <BottomMenu activeTab={currentTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
