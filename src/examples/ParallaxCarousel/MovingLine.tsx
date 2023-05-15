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
import {PageDot} from './FadingDot';

const {width} = Dimensions.get('screen');
const LINE_HEIGHT = 3;
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
  0,
  DOT_SIZE + DOT_MARGIN_RIGHT,
);

interface MovingLineProps {
  translateX: SharedValue<number>;
}
export const MovingLine = ({translateX}: MovingLineProps) => {
  const animatedStyle = useAnimatedStyle(() => {
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
            <PageDot key={index} index={index} translateX={translateX} />
          ))}
        </View>
        <View>
          <Animated.View
            style={[
              {
                position: 'absolute',
                height: LINE_HEIGHT,
                width: DOT_SIZE,
                backgroundColor: '#000',
                top: -(DOT_SIZE / 2 + LINE_HEIGHT / 2),
                left: DOT_SIZE / 2,
              },
              animatedStyle,
            ]}
          />
        </View>
      </View>
    </View>
  );
};
