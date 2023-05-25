import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {IMAGE_HEIGHT, IMAGE_WIDTH, SPACING} from '.';

const {width} = Dimensions.get('screen');

interface RenderItemProps {
  item: {
    key: number;
    image: string;
    title: string;
    subtitle: string;
    price: string;
  };
  index: number;
  translateX: SharedValue<number>;
}

export const RenderItem = ({item, index, translateX}: RenderItemProps) => {
  const animatedStyles = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const translateY = interpolate(translateX.value, inputRange, [
      SPACING * 4,
      0,
      SPACING * 4,
    ]);
    const opacity = interpolate(translateX.value, inputRange, [0.2, 1, 0.2]);

    return {
      transform: [{translateY}],
      opacity,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{uri: item.image}}
        style={[styles.image, animatedStyles]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
    marginTop: SPACING * 7,
    paddingLeft: SPACING * 4,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
});
