import React, { useState, useRef, useEffect } from 'react'; // <--- Adicionamos useEffect
import { View, Text, FlatList, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

import { carouselFeatures, Feature } from '@/data/carouselFeatures';
import { colors } from '@/theme/colors';
import { styles, ITEM_WIDTH } from './styles';
import { CarouselDots } from '../CarouselDots';

export function FeatureCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<Feature>>(null);
  const totalSlides = carouselFeatures.length;

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setActiveIndex(index);
  };

  useEffect(() => {
    const delay = 3000;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % totalSlides;

      scrollToIndex(nextIndex);
    }, delay);

    return () => clearInterval(interval);
  }, [activeIndex, totalSlides]);

  const handleNext = () => {
    if (activeIndex < totalSlides - 1) {
      scrollToIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    }
  };

  const handleDotPress = (index: number) => {
    scrollToIndex(index);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / ITEM_WIDTH);
    setActiveIndex(newIndex);
  };

  const renderItem = ({ item }: { item: Feature }) => (
    <View style={styles.slideContainer}>
      <Text style={styles.footerTitle}>{item.title}</Text>

      <View style={styles.featureImagePlaceholder} />

      <Text style={styles.footerDescription}>{item.description.replace(/\\n/g, '\n')}</Text>
    </View>
  );

  return (
    <View style={styles.carouselContainer}>
      <View style={styles.indicatorControls}>
        <CarouselDots totalSlides={totalSlides} activeIndex={activeIndex} onDotPress={handleDotPress} />

        <View style={styles.arrowButtons}>
          <TouchableOpacity
            onPress={handlePrev}
            disabled={activeIndex === 0}
            style={[styles.arrowButton, activeIndex === 0 && styles.disabledArrow]}
          >
            <ChevronLeft size={24} color={activeIndex === 0 ? colors.muted : colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNext}
            disabled={activeIndex === totalSlides - 1}
            style={[styles.arrowButton, activeIndex === totalSlides - 1 && styles.disabledArrow]}
          >
            <ChevronRight size={24} color={activeIndex === totalSlides - 1 ? colors.muted : colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList<Feature>
        ref={flatListRef}
        data={carouselFeatures}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
      />
    </View>
  );
}
