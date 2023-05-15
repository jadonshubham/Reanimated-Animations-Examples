import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {RenderCard} from './RenderCard';
import {MovingDot} from './MovingDot';
import {FadingDot} from './FadingDot';
import {MovingFrame} from './MovingFrame';
import {StretchingBox} from './StretchingBox';
import {MovingFrameStretch} from './MovingFrameStretch';
import {MovingLine} from './MovingLine';

export const images = [
  'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
  'https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80',
  'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80',
  'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80',
  'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80',
  'https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80',
  'https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80',
  'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80',
  'https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80',
  'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80',
];
const data = images.map((image, index) => ({
  key: String(index),
  photo: image,
  avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
    Math.random() * 40,
  )}.jpg`,
}));

const ParallaxCarousel = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={scrollHandler}
        renderItem={({item, index}) => (
          <RenderCard item={item} index={index} translateX={translateX} />
        )}
      />
      <MovingLine translateX={translateX} />
      <View style={{marginTop: 10}} />
      <StretchingBox translateX={translateX} />
      <View style={{marginTop: 10}} />
      <MovingFrameStretch translateX={translateX} />
      <View style={{marginTop: 10}} />
      <MovingDot translateX={translateX} />
      <View style={{marginTop: 10}} />
      <FadingDot translateX={translateX} />
      <View style={{marginTop: 10}} />
      <MovingFrame translateX={translateX} />
    </SafeAreaView>
  );
};

export default ParallaxCarousel;
