// count = 1 is for 2 dots
export const getInputRangeForInterpolate = (
  count: number,
  carousalElementWidth: number,
) => {
  'worklet';
  const inputRange = [];
  for (
    let i = 0;
    i <= carousalElementWidth * count;
    i += carousalElementWidth / 2
  ) {
    inputRange.push(i);
  }

  return inputRange;
};

// count = 1 is for 2 dots
export const getOutputTranslateRangeForInterpolate = (
  count: number,
  carousalElementWidth: number,
  fullBlockWidth: number, //blockWidth + Margin
) => {
  'worklet';

  const outputRange = [];
  let currentTranslateValue = 0;

  for (
    let i = 0;
    i <= carousalElementWidth * count;
    i += carousalElementWidth
  ) {
    if (i === carousalElementWidth * count) {
      outputRange.push(currentTranslateValue);
    } else {
      outputRange.push(currentTranslateValue, currentTranslateValue);
    }

    currentTranslateValue += fullBlockWidth;
  }

  return outputRange;
};

// count = 1 is for 2 dots
export const getOutputWidthRangeForInterpolate = (
  count: number,
  carousalElementWidth: number,
  blockWidth: number,
  maxBlockWidth: number, //combined block width: 2 Blocks and 1 margin b/w them
) => {
  'worklet';

  const outputRange = [];
  for (
    let i = 0;
    i <= carousalElementWidth * count;
    i += carousalElementWidth
  ) {
    if (i === carousalElementWidth * count) {
      outputRange.push(blockWidth);
    } else {
      outputRange.push(blockWidth, maxBlockWidth);
    }
  }

  return outputRange;
};
