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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.textPrimary,
    width: '100%',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary, 
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceTitle: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    marginBottom: 4,
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  consumptionText: {
    fontSize: 12,
    color: '#666',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.textPrimary, 
    borderRadius: 16,
    paddingHorizontal: 4,
    height: 24,
  },
  switchLabel: {
    color: '#FFF',
    fontSize: 10,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  actionIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 4,
    borderWidth: 1,
    borderColor: colors.textPrimary,
    borderRadius: 4,
  },
  footerButtons: {
    marginTop: 24,
    gap: 12,
  },
  buttonSecondary: {
    backgroundColor: '#9CA3AF', 
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#9CA3AF', 
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonTextWhite: {
    color: '#FFF',
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    width: '80%',
    padding: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: '#556B7D', 
    marginBottom: 24,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },
  modalButtonConfirm: {
    backgroundColor: '#9CA3AF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  modalButtonCancel: {
    backgroundColor: '#9CA3AF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
});