import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {CreditCardData as data} from './constants';
import {CREDIT_CARD_HEIGHT, RenderCreditCard} from './RenderCreditCard';

const ITEM_HEIGHT = 120;
const SEPERATOR_HEIGHT = 20;

const CreditCardScrollAnimation = () => {
  const translateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateY.value = event.contentOffset.y;
  });

  const renderItem = ({item}: {item: (typeof data)[0]; index: number}) => {
    return (
      <View
        style={[
          styles.listCard,
          {
            backgroundColor: item.color,
            height: ITEM_HEIGHT * item.heightMultiplier,
          },
        ]}>
        <Text style={styles.listCardText}>Section {item.color}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={{height: SEPERATOR_HEIGHT}} />
        <Animated.FlatList
          data={data}
          keyExtractor={item => item.color}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContainer}
          ItemSeparatorComponent={SeperatorComponent}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
        />
        <RenderCreditCard translateY={translateY} />
      </View>
    </SafeAreaView>
  );
};

const SeperatorComponent = () => {
  return <View style={styles.seperator} />;
};

export default CreditCardScrollAnimation;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
  flatListContainer: {
    paddingTop: CREDIT_CARD_HEIGHT,
    paddingBottom: 16,
  },
  listCard: {
    borderRadius: 16,
    padding: 16,
    justifyContent: 'flex-end',
  },
  listCardText: {
    color: '#fff',
    fontSize: 16,
  },
  seperator: {
    height: SEPERATOR_HEIGHT,
  },
});
