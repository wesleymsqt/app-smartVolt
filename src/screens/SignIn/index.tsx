import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native"; // <--- REMOVIDO SafeAreaView DAQUI
import { SafeAreaView } from "react-native-safe-area-context"; // <--- ADICIONADO AQUI
import { Zap, Facebook } from "lucide-react-native";
import { AntDesign } from "@expo/vector-icons";

import { styles } from "./styles";

export function SignIn() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <View>
          <View style={styles.header}>
            <View style={styles.logoPlaceholder} />
            <Text style={styles.title}>
              Gerencie Seus Aparelhos{"\n"}na Smart Volt{" "}
              <Zap size={24} color="#000" fill="none" strokeWidth={2.5} />
            </Text>
          </View>

          {/* Linha Divisória */}
          <View style={styles.divider} />

          {/* Caixa de Login */}
          <View style={styles.authContainer}>
            <Text style={styles.authTitle}>Entrar/Cadastrar-se com</Text>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Google</Text>
                <AntDesign name="google" size={18} color="black" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Facebook</Text>
                <Facebook size={18} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Rodapé e Indicadores */}
        <View>
          <View style={styles.carouselSection}>
            <View style={styles.carouselIndicators}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>

          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Controle Total</Text>
            <View style={styles.featureImagePlaceholder} />
            <Text style={styles.footerDescription}>
              Ligue e desligue seus aparelhos de{"\n"}qualquer lugar pelo
              celular
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
