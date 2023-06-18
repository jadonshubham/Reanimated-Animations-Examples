import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {BOX_SIZE, DOT_SIZE, LIMIT} from '.';

interface RenderDotProps {
  tapX: SharedValue<number>;
  tapY: SharedValue<number>;
  touchRadius: SharedValue<number>;
  rowIndex: number;
  columnIndex: number;
}

export const RenderDot = ({
  tapX,
  tapY,
  touchRadius,
  rowIndex,
  columnIndex,
}: RenderDotProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const dotY = (rowIndex + 1) * BOX_SIZE - BOX_SIZE / 2;
    const dotX = (columnIndex + 1) * BOX_SIZE - BOX_SIZE / 2;

    const distX = Math.abs(tapX.value - dotX);
    const distY = Math.abs(tapY.value - dotY);
    const distOfPoints = Math.sqrt(distX * distX + distY * distY);

    const isDotInsideTopBox = distOfPoints <= touchRadius.value;

    if (isDotInsideTopBox) {
      const distOfRadiusAndPoint = touchRadius.value - distOfPoints;
      const shouldDotGoOutside = distOfRadiusAndPoint >= LIMIT;

      if (shouldDotGoOutside) {
        return {
          backgroundColor: interpolateColor(
            distOfRadiusAndPoint,
            [LIMIT, LIMIT * 2],
            ['#ff0000', '#808080'],
          ),
          transform: [
            {
              scale: withTiming(1),
            },
          ],
        };
      }

      return {
        backgroundColor: '#ff0000',
        transform: [
          {
            scale: withTiming(2.8),
          },
        ],
      };
    }
    return {
      backgroundColor: '#808080',
      transform: [{scale: 1}],
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const styles = StyleSheet.create({
  dot: {
    borderRadius: DOT_SIZE,
    width: DOT_SIZE,
    height: DOT_SIZE,
    backgroundColor: '#808080',
  },
});
