import { StyleSheet, Platform, StatusBar } from 'react-native';
import { colors } from '@/theme/colors';
import { fontFamily } from '@/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  titleContainer: {
    marginBottom: 24,
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

  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  activeTab: {
    backgroundColor: colors.borderMuted,
  },
  inactiveTab: {
    backgroundColor: colors.border,
    opacity: 0.2,
  },
  tabText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.textPrimary,
  },

  contentContainer: {
    flex: 1,
    backgroundColor: colors.borderMuted,

    marginHorizontal: 24,
    marginBottom: 100,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

    paddingHorizontal: 24,
    paddingTop: 24,
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
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },

  metaValue: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginVertical: 4,
  },
  metaLabel: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.textPrimary,
    opacity: 0.7,
  },

  routineTime: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: 8,
    marginTop: 4,
    textAlign: 'center',
  },
  routineDays: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  routineAction: {
    fontSize: 13,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
});
