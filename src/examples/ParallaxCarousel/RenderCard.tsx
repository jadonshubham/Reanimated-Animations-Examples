import React from 'react';
import {Dimensions, Image, View} from 'react-native';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

interface RenderCardProps {
  item: {
    key: string;
    photo: string;
    avatar_url: string;
  };
  index: number;
  translateX: SharedValue<number>;
}

export const RenderCard = ({item, index, translateX}: RenderCardProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    const outputRange = [-width * 0.3, 0, width * 0.3];

    const translate = interpolate(
      translateX.value,
      inputRange,
      outputRange,
      Extrapolate.CLAMP,
    );

    return {
      transform: [{translateX: translate}],
    };
  });

  return (
    <View
      style={{
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <View
        style={{
          padding: 12,
          backgroundColor: '#fff',
          width: ITEM_WIDTH + 24,
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.5,
          shadowRadius: 30,
          elevation: 14,
        }}>
        <View
          style={{
            overflow: 'hidden',
            alignItems: 'center',
            borderRadius: 12,
          }}>
          <Animated.Image
            source={{uri: item.photo}}
            style={[
              {
                height: ITEM_HEIGHT,
                width: width,
                resizeMode: 'cover',
              },
              animatedStyle,
            ]}
          />
        </View>
        <Image
          source={{uri: item.avatar_url}}
          style={{
            width: 60,
            height: 60,
            borderRadius: 60,
            borderWidth: 6,
            borderColor: '#fff',
            position: 'absolute',
            bottom: -30,
            right: 60,
          }}
        />
      </View>
    </View>
  );
};
