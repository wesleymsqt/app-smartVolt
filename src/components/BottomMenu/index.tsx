import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LayoutDashboard, Armchair, Plug2, SlidersHorizontal } from 'lucide-react-native';

import { styles } from './styles';
import { colors } from '@/theme/colors';

export type TabTypes = 'home' | 'grid' | 'list' | 'menu';

type Props = {
  activeTab: TabTypes;
  onTabChange: (tab: TabTypes) => void;
};

export function BottomMenu({ activeTab, onTabChange }: Props) {
  const getIconColor = (isActive: boolean) => (isActive ? colors.textPrimary : '#D1D5DB');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'home' && styles.activeTab]}
        onPress={() => onTabChange('home')}
      >
        <LayoutDashboard size={24} color={getIconColor(activeTab === 'home')} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'grid' && styles.activeTab]}
        onPress={() => onTabChange('grid')}
      >
        <Armchair size={24} color={getIconColor(activeTab === 'grid')} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'list' && styles.activeTab]}
        onPress={() => onTabChange('list')}
      >
        <Plug2 size={24} color={getIconColor(activeTab === 'list')} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'menu' && styles.activeTab]}
        onPress={() => onTabChange('menu')}
      >
        <SlidersHorizontal size={24} color={getIconColor(activeTab === 'menu')} />
      </TouchableOpacity>
    </View>
  );
}
