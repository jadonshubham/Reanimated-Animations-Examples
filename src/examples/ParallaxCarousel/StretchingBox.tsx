import React from 'react';
import {Dimensions, View} from 'react-native';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {images} from '.';
import {DOT_SIZE} from './RenderDot';
import {DOT_MARGIN_RIGHT} from './MovingDot';
import {
  getInputRangeForInterpolate,
  getOutputTranslateRangeForInterpolate,
  getOutputWidthRangeForInterpolate,
} from './utils';

const {width} = Dimensions.get('screen');

interface StretchingBoxProps {
  translateX: SharedValue<number>;
}
export const StretchingBox = ({translateX}: StretchingBoxProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const dotsPairs = images.length - 1;
    const inputRange = getInputRangeForInterpolate(dotsPairs, width);
    const outputRangeForTranslate = getOutputTranslateRangeForInterpolate(
      dotsPairs,
      width,
      DOT_SIZE + DOT_MARGIN_RIGHT,
    );
    const outputRangeForWidth = getOutputWidthRangeForInterpolate(
      dotsPairs,
      width,
      DOT_SIZE,
      2 * DOT_SIZE + DOT_MARGIN_RIGHT,
    );

    const translate = interpolate(
      translateX.value,
      inputRange,
      outputRangeForTranslate,
      Extrapolate.CLAMP,
    );

    const boxWidth = interpolate(
      translateX.value,
      inputRange,
      outputRangeForWidth,
      Extrapolate.CLAMP,
    );

    return {
      transform: [{translateX: translate}],
      width: boxWidth,
    };
  });

  return (
    <View style={{alignItems: 'center'}}>
      <View>
        <View style={{flexDirection: 'row'}}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                {
                  height: DOT_SIZE,
                  width: DOT_SIZE,
                  backgroundColor: '#ddd',
                  marginRight: DOT_MARGIN_RIGHT,
                },
              ]}
            />
          ))}
        </View>
        <Animated.View
          style={[
            {
              position: 'absolute',
              height: DOT_SIZE,
              width: DOT_SIZE,
              backgroundColor: '#000',
            },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
};
