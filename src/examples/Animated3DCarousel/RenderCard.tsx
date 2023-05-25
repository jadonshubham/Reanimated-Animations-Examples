import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {IMAGE_HEIGHT, IMAGE_WIDTH, SPACING} from '.';

interface RenderCardProps {
  progress: SharedValue<number>;
}

export const RenderCard = ({progress}: RenderCardProps) => {
  const animatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(progress.value, [0, 0.5, 1], [0, 90, 180]);

    return {
      transform: [
        {perspective: IMAGE_WIDTH * 4},
        {rotateY: `${rotateValue}deg`},
      ],
    };
  });

  return <Animated.View style={[styles.container, animatedStyles]} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: SPACING * 2,
    paddingBottom: SPACING * 7,
    width: IMAGE_WIDTH + SPACING * 4,
    height: IMAGE_HEIGHT * 1.8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    marginTop: SPACING * 10,
    position: 'absolute',
    zIndex: -999,
    marginLeft: SPACING * 2,
  },
});
