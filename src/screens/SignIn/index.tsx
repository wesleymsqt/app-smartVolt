import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Facebook } from 'lucide-react-native';
import { AntDesign } from '@expo/vector-icons';

import { styles } from '@/screens/SignIn/styles';
import { colors } from '@/theme/colors';
import { Logo } from '@/components/Logo';
import { FeatureCarousel } from '@/components/FeatureCarousel';

export function SignIn() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Logo width={100} height={100} color={colors.primary} />

              <Text style={styles.title}>Gerencie Seus Aparelhos{'\n'} na Smart Volt</Text>
              <Logo width={60} height={32} color={colors.primary} style={{ marginLeft: 16 }} />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.authContainer}>
            <Text style={styles.authTitle}>Entrar/Cadastrar-se com</Text>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Google</Text>
                <AntDesign name="google" size={18} color={colors.textPrimary} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Facebook</Text>
                <Facebook size={18} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <FeatureCarousel />
      </ScrollView>
    </SafeAreaView>
  );
}
