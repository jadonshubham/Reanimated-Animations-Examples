import React from 'react';
import {Dimensions, View} from 'react-native';
import {images} from '.';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {DOT_SIZE, RenderDot} from './RenderDot';

const {width} = Dimensions.get('screen');
export const DOT_MARGIN_RIGHT = 10;

interface MovingDotProps {
  translateX: SharedValue<number>;
}
export const MovingDot = ({translateX}: MovingDotProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const translate = interpolate(
      translateX.value,
      [0, (images.length - 1) * width],
      [0, (DOT_MARGIN_RIGHT + DOT_SIZE) * (images.length - 1)],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{translateX: translate}],
    };
  });

  return (
    <View style={{alignItems: 'center'}}>
      <View>
        <View style={{flexDirection: 'row'}}>
          {images.map((_, index) => (
            <View key={index} style={{marginRight: DOT_MARGIN_RIGHT}}>
              <RenderDot />
            </View>
          ))}
        </View>
        <Animated.View style={[{position: 'absolute'}, animatedStyle]}>
          <RenderDot isSelected />
        </Animated.View>
      </View>
    </View>
  );
};
