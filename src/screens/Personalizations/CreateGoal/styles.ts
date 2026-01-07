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
  heroContainer: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 8,
  },
  heroLabel: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
    opacity: 0.6,
    marginBottom: 8,
  },
  heroInputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  heroInput: {
    fontSize: 56,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    minWidth: 80,
    padding: 0,
    includeFontPadding: false,
    height: 64,
  },
  heroUnit: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.textSecondary,
    marginBottom: 10,
    marginLeft: 8,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  simpleInput: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.textPrimary,
    padding: 0,
    height: 24,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    marginBottom: 24,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  segmentButtonActive: {
    backgroundColor: colors.textSecondary,
  },
  segmentText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
  },
  segmentTextActive: {
    color: '#FFF',
    fontFamily: fontFamily.bold,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    minWidth: '48%',
    flex: 1,
  },
  itemCardSelected: {
    borderColor: colors.textSecondary,
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  iconBoxSelected: {
    backgroundColor: colors.textSecondary,
  },
  itemCardText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
  },
  itemCardTextSelected: {
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    marginBottom: 32,
  },
  toggleLabel: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
  },
  footerButtons: {
    marginBottom: 20,
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
});
