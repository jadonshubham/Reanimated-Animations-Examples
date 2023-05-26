import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');
export const CREDIT_CARD_HEIGHT = 190;
const LOGO_WIDTH = 64;
const SPACING = 4;
const SCALE_AMOUNT = (width - LOGO_WIDTH - SPACING * 24) / ((2 * width) / 3);

export const RenderCreditCard = ({
  translateY,
}: {
  translateY: SharedValue<number>;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      translateY.value,
      [0, CREDIT_CARD_HEIGHT],
      [CREDIT_CARD_HEIGHT, CREDIT_CARD_HEIGHT / 3],
      Extrapolate.CLAMP,
    );

    return {height};
  });

  const animatedStyle1 = useAnimatedStyle(() => {
    const translateV = interpolate(
      translateY.value,
      [0, CREDIT_CARD_HEIGHT],
      [0, -SPACING * 10],
      Extrapolate.CLAMP,
    );

    const translateH = interpolate(
      translateY.value,
      [0, CREDIT_CARD_HEIGHT],
      [0, LOGO_WIDTH],
      Extrapolate.CLAMP,
    );

    const scale = interpolate(
      translateY.value,
      [0, CREDIT_CARD_HEIGHT],
      [1, SCALE_AMOUNT >= 1 ? 1 : SCALE_AMOUNT],
      Extrapolate.CLAMP,
    );

    return {
      transform: [
        {translateY: translateV},
        {translateX: translateH},
        {scale: scale},
      ],
    };
  });

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View style={styles.cardLogo}>
        <Text style={styles.cardText}>VISA</Text>
      </View>
      <Animated.View style={[styles.cardNumberContainer, animatedStyle1]}>
        <Text style={styles.cardNumberStars}>****</Text>
        <Text style={styles.cardNumberStars}>****</Text>
        <Text style={styles.cardNumberStars}>****</Text>
        <Text style={styles.cardNumberText}>5521</Text>
      </Animated.View>
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.cardFooterTitle}>VALID THRU</Text>
          <Text style={styles.validDate}>05/2026</Text>
        </View>
        <View>
          <Text style={styles.cardFooterTitle}>CARD HOLDER</Text>
          <Text style={styles.cardHolder}>John Doe</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#673cf6',
    paddingHorizontal: SPACING * 6,
    paddingTop: SPACING * 4,
    borderRadius: SPACING * 4,
    width: '100%',
    height: CREDIT_CARD_HEIGHT,
    position: 'absolute',
    marginLeft: SPACING * 4,
    marginTop: SPACING * 4,
    overflow: 'hidden',
  },
  cardLogo: {
    backgroundColor: '#571cd6',
    paddingVertical: 2,
    width: LOGO_WIDTH,
    alignItems: 'center',
  },
  cardText: {fontSize: SPACING * 5, color: '#673cf6', fontWeight: '900'},
  cardNumberContainer: {
    marginTop: SPACING * 4,
    width: (2 * width) / 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardNumberStars: {
    color: '#fff',
    fontSize: SPACING * 7,
    lineHeight: SPACING * 7,
    letterSpacing: 2,
  },
  cardNumberText: {
    color: '#fff',
    fontSize: SPACING * 5,
    lineHeight: SPACING * 5,
    letterSpacing: SPACING,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING * 4,
  },
  cardFooterTitle: {color: '#fbfbfb', fontSize: 18},
  validDate: {color: '#fff', fontWeight: '800', marginTop: SPACING},
  cardHolder: {
    color: '#fff',
    fontWeight: '800',
    marginTop: SPACING,
    textAlign: 'right',
  },
});
