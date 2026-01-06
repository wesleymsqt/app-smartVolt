import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LogOut } from 'lucide-react-native';

import { styles } from './styles';
import { colors } from '@/theme/colors';
import { Logo } from '@/components/Logo';
import { BottomMenu } from '@/components/BottomMenu';

export function EditDevice() {
  const navigation = useNavigation<any>();
  const [selectedGroup, setSelectedGroup] = useState<string>('Cozinha');

  const groups = ['Cozinha', 'Quarto', 'Nenhum'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Logo width={50} height={28} color={colors.textPrimary} />
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <LogOut color={colors.textPrimary} size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>Ar-Condicionado</Text>
          <View style={styles.divider} />
        </View>

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
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.goBack()}>
            <Text style={styles.actionButtonText}>Salvar Mudanças</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
            <Text style={styles.actionButtonText}>Remover Aparelho</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.goBack()}>
            <Text style={styles.actionButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomMenu activeTab="list" onTabChange={() => {}} />
    </SafeAreaView>
  );
}
