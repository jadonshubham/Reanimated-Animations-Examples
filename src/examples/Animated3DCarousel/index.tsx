import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {Animated3DCarouselData as data} from './constans';
import {RenderCard} from './RenderCard';
import {RenderCardContent} from './RenderCardContent';
import {RenderItem} from './RenderItem';

const {width} = Dimensions.get('screen');
export const IMAGE_WIDTH = width * 0.65;
export const IMAGE_HEIGHT = IMAGE_WIDTH * 0.7;
export const SPACING = 8;

const Animated3DCarousel = () => {
  const translateX = useSharedValue(0);
  const progress = useDerivedValue(() => {
    return (translateX.value / width) % 1;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef<any>(null);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  const momentumScrollEndHandler = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    setCurrentIndex(event.nativeEvent.contentOffset.x / width);
  };

  const goBack = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      listRef?.current?.scrollToOffset({
        offset: prevIndex * width,
        animated: true,
      });
    }
  };

  const goNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex <= data.length - 1) {
      listRef?.current?.scrollToOffset({
        offset: nextIndex * width,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Animated.FlatList
          ref={listRef}
          data={data}
          keyExtractor={item => item.key.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={scrollHandler}
          onMomentumScrollEnd={momentumScrollEndHandler}
          renderItem={({item, index}) => (
            <RenderItem item={item} index={index} translateX={translateX} />
          )}
        />

        <RenderCard progress={progress} />

        {data.map((item, index) => (
          <RenderCardContent
            key={item.image}
            item={item}
            index={index}
            translateX={translateX}
          />
        ))}

        <View style={styles.buttonContainer}>
          <Pressable
            style={[
              styles.button,
              {
                opacity: currentIndex === 0 ? 0.5 : 1,
              },
            ]}
            onPress={goBack}
            disabled={currentIndex === 0}>
            <Image source={require('./icons/back.png')} style={styles.icon} />
            <Text style={[styles.iconText, {paddingLeft: SPACING}]}>Back</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              {
                opacity: currentIndex === data.length - 1 ? 0.5 : 1,
              },
            ]}
            onPress={goNext}
            disabled={currentIndex === data.length - 1}>
            <Text style={[styles.iconText, {paddingRight: SPACING}]}>Next</Text>
            <Image source={require('./icons/next.png')} style={styles.icon} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#79cedf',
  },
  wrapper: {
    position: 'relative',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: IMAGE_WIDTH + SPACING * 4,
    justifyContent: 'space-between',
    marginHorizontal: SPACING * 2,
    position: 'absolute',
    top: SPACING * 14 + IMAGE_HEIGHT * 1.8,
  },
  button: {flexDirection: 'row'},
  icon: {height: 16, width: 32},
  iconText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
});

export default Animated3DCarousel;
