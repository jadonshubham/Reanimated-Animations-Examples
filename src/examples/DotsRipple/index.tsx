import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {
  Easing,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {RenderDot} from './RenderDot';
import {getMaxTouchRadius} from './utils';

const {width, height} = Dimensions.get('screen');
export const BOX_SIZE = 24;
export const DOT_SIZE = 3;
export const LIMIT = width / 2.5;

const DotsRipple = () => {
  const insets = useSafeAreaInsets();

  const SCREEN_WIDTH = width - insets.left - insets.right;
  const SCREEN_HEIGHT = height - insets.top - insets.bottom;
  const NO_OF_HORIZONTAL = Math.floor(SCREEN_WIDTH / BOX_SIZE);
  const NO_OF_VERTICAL = Math.floor(SCREEN_HEIGHT / BOX_SIZE);

  const tapX = useSharedValue(0);
  const tapY = useSharedValue(0);
  const touchRadius = useSharedValue(0);

  const tap = Gesture.Tap().onStart(event => {
    const touchRadiusMax = getMaxTouchRadius(event.x, event.y);
    if (touchRadius.value === 0) {
      tapY.value = event.y;
      tapX.value = event.x;

      touchRadius.value = withSequence(
        withTiming(touchRadiusMax, {duration: 3000, easing: Easing.linear}),
        withTiming(0, {duration: 0}),
      );
    }
  });

  const RenderDots = useMemo(() => {
    const dots = [];
    let tempRow = [];
    for (let i = 0; i < NO_OF_VERTICAL; i++) {
      tempRow = [];
      for (let j = 0; j < NO_OF_HORIZONTAL; j++) {
        tempRow.push(
          <View key={`${i} ${j} dot`} style={styles.dotContainer}>
            <RenderDot
              tapX={tapX}
              tapY={tapY}
              rowIndex={i}
              columnIndex={j}
              touchRadius={touchRadius}
            />
          </View>,
        );
      }
      dots.push(
        <View key={`${i} row`} style={styles.dotsRow}>
          {tempRow}
        </View>,
      );
    }

    return dots;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GestureDetector gesture={tap}>
        <View style={styles.gestureArea}>{RenderDots}</View>
      </GestureDetector>
    </SafeAreaView>
  );
};

export default DotsRipple;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gestureArea: {
    flex: 1,
    backgroundColor: '#313131',
  },
  dotsRow: {
    flexDirection: 'row',
  },
  dot: {
    borderRadius: DOT_SIZE,
    width: DOT_SIZE,
    height: DOT_SIZE,
    backgroundColor: '#808080',
  },
  dotContainer: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
