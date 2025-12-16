import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/theme/colors';

type Props = {
  totalSlides: number;
  activeIndex: number;
  onDotPress: (index: number) => void;
};

export function CarouselDots({ totalSlides, activeIndex, onDotPress }: Props) {
  const dots = Array.from({ length: totalSlides });

  return (
    <View style={styles.carouselIndicators}>
      {dots.map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onDotPress(index)}
          style={styles.dotContainer}
          accessibilityLabel={`Ir para o slide ${index + 1}`}
        >
          <View style={[styles.dot, index === activeIndex ? styles.activeDot : null]} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  carouselIndicators: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    marginBottom: 16,
  },
  dotContainer: {
    padding: 4,
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
});
