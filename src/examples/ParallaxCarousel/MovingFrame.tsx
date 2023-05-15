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

const {width} = Dimensions.get('screen');
export const FRAME_SIZE_DIFFERENCE = 10;
export const FRAME_SIZE = DOT_SIZE + FRAME_SIZE_DIFFERENCE;

interface MovingFrameProps {
  translateX: SharedValue<number>;
}
export const MovingFrame = ({translateX}: MovingFrameProps) => {
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
