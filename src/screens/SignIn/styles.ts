import { StyleSheet, Platform, StatusBar } from 'react-native';
import { colors } from '../../theme/colors';
import { fontFamily } from '../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 24,
    marginTop: 20,
  },
  logoPlaceholder: {
    width: 80,
    height: 40,
    backgroundColor: colors.muted,
    marginBottom: 16,
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    lineHeight: 32,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    width: '100%',
    marginBottom: 32,
  },
  authContainer: {
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 24,
    borderRadius: 0,
    marginBottom: 32,
  },
  authTitle: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    marginBottom: 16,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    borderRadius: 4,
    gap: 8,
  },
  socialButtonText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
  },
  carouselSection: {
    marginBottom: 20,
  },
  carouselIndicators: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.textPrimary,
    backgroundColor: colors.transparent,
  },
  activeDot: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  footerSection: {
    alignItems: 'center',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 24,
  },
  footerTitle: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  featureImagePlaceholder: {
    width: 180,
    height: 140,
    backgroundColor: colors.muted,
    borderRadius: 4,
  },
  footerDescription: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.textPrimary,
    lineHeight: 20,
    maxWidth: 250,
  },
});
