import { StyleSheet, Platform, StatusBar } from 'react-native';
import { colors } from '@/theme/colors';
import { fontFamily } from '@/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },

  // Informações do Topo
  infoContainer: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.textPrimary,
  },
  infoValue: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },

  sectionTitle: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: 12,
  },

  // --- Estilo dos Cards (Padronizado com ManageDevices) ---
  card: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardLeftContent: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  deviceTitle: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  // Badge Verde
  consumptionBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDF5E6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C3DBC0',
  },
  consumptionText: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },

  cardRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusLabel: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
  },
  verticalDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.borderMuted,
    marginHorizontal: 12,
  },
  iconButton: {
    padding: 4,
  },

  // --- Botões do Rodapé ---
  footerButtons: {
    marginTop: 24,
    gap: 12,
  },
  buttonAdd: {
    flexDirection: 'row',
    backgroundColor: colors.textPrimary, // Botão Principal Escuro
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDelete: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.textPrimary,
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextWhite: {
    color: '#FFF',
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
  buttonTextDark: {
    color: colors.textPrimary,
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },

  // --- Modais ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    width: '85%',
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },
  modalButtonConfirm: {
    flex: 1,
    backgroundColor: colors.textSecondary, // Cor de destaque ou perigo
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  modalButtonCancel: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  modalItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
    width: '100%',
  },
});
