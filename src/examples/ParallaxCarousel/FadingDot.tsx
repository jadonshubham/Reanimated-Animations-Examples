import React from 'react';
import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Dimensions, View} from 'react-native';
import {DOT_MARGIN_RIGHT} from './MovingDot';
import {images} from '.';
import {DOT_SIZE} from './RenderDot';

const {width} = Dimensions.get('screen');

interface FadingDotProps {
  translateX: SharedValue<number>;
}

export const FadingDot = ({translateX}: FadingDotProps) => {
  return (
    <View style={{alignItems: 'center'}}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {images.map((_, index) => (
          <PageDot key={index} index={index} translateX={translateX} />
        ))}
      </View>
    </View>
  );
};

interface PageDotProps {
  index: number;
  translateX: SharedValue<number>;
}

export const PageDot = ({index, translateX}: PageDotProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      ['#ddd', '#000', '#ddd'],
    );
    return {backgroundColor};
  });

  return (
    <View style={{marginRight: DOT_MARGIN_RIGHT}}>
      <Animated.View
        style={[
          {
            height: DOT_SIZE,
            width: DOT_SIZE,
            borderRadius: DOT_SIZE,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};
