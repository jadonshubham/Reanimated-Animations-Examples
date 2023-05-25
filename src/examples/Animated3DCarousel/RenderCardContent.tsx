import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {IMAGE_HEIGHT, IMAGE_WIDTH, SPACING} from '.';

const {width} = Dimensions.get('screen');

interface RenderCardContentProps {
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

export const RenderCardContent = ({
  item,
  index,
  translateX,
}: RenderCardContentProps) => {
  const animatedStyles = useAnimatedStyle(() => {
    const inputRange = [
      (index - 0.3) * width,
      index * width,
      (index + 0.3) * width,
    ];

    const rotateY = interpolate(translateX.value, inputRange, [45, 0, 45]);
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.EXTEND,
    );

    return {
      transform: [{perspective: IMAGE_WIDTH * 4}, {rotateY: `${rotateY}deg`}],
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING * 2,
    width: IMAGE_WIDTH + SPACING * 4,
    height: IMAGE_HEIGHT * 1.8,
    position: 'absolute',
    marginTop: SPACING * 10,
    marginLeft: SPACING * 2,
  },
  card: {paddingTop: IMAGE_HEIGHT},
  image: {},
  textContainer: {},
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#aaaaaa',
    textAlign: 'center',
  },
  price: {
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: SPACING * 2,
  },
});
