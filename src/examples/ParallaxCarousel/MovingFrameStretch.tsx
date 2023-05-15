import React from 'react';
import {Dimensions, View} from 'react-native';
import {images} from '.';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {DOT_SIZE} from './RenderDot';
import {DOT_MARGIN_RIGHT} from './MovingDot';
import {PageDot} from './FadingDot';
import {FRAME_SIZE, FRAME_SIZE_DIFFERENCE} from './MovingFrame';
import {
  getInputRangeForInterpolate,
  getOutputTranslateRangeForInterpolate,
  getOutputWidthRangeForInterpolate,
} from './utils';

const {width} = Dimensions.get('screen');

interface MovingFrameStretchProps {
  translateX: SharedValue<number>;
}
export const MovingFrameStretch = ({translateX}: MovingFrameStretchProps) => {
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
      FRAME_SIZE,
      2 * DOT_SIZE + DOT_MARGIN_RIGHT + FRAME_SIZE_DIFFERENCE,
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
            <View key={index}>
              <PageDot key={index} index={index} translateX={translateX} />
            </View>
          ))}
        </View>
        <Animated.View
          style={[
            {
              position: 'absolute',
              borderColor: '#000',
              borderWidth: 1,
              borderRadius: FRAME_SIZE,
              top: -FRAME_SIZE_DIFFERENCE / 2,
              left: -FRAME_SIZE_DIFFERENCE / 2,
              height: FRAME_SIZE,
              width: FRAME_SIZE,
            },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
};
