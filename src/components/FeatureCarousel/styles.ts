import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/theme/colors';
import { fontFamily } from '@/theme/fonts';

const { width } = Dimensions.get('window');
export const ITEM_WIDTH = width - 48;

export const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  indicatorControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  arrowButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  arrowButton: {
    padding: 8,
  },
  disabledArrow: {
    opacity: 0.5,
  },
  slideContainer: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    gap: 12,
    marginRight: 24,
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
