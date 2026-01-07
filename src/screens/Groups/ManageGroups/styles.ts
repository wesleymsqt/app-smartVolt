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

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  cardFooter: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.textPrimary,
    opacity: 0.8,
  },
});
