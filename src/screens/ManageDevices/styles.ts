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
    alignItems: 'center',
    marginBottom: 24,
  },
  titleContainer: {
    marginBottom: 32,
    alignItems: 'center',
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
  },

  sectionTitle: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: 12,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 48,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textPrimary,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeftContent: {
    flex: 1,
    justifyContent: 'center',
  },
  deviceName: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  deviceStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  consumptionText: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.textPrimary,
  },

  cardRightContent: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderWidth: 1.5,
    borderColor: colors.textPrimary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
