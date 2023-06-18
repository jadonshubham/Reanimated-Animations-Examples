import {Dimensions} from 'react-native';
import {LIMIT} from '.';

const {width, height} = Dimensions.get('screen');

export const getMaxTouchRadius = (x: number, y: number) => {
  'worklet';
  let maxRadius = 0;

  if (x < width / 2) {
    if (y < height / 2) {
      maxRadius = Math.sqrt(
        (width - x) * (width - x) + (height - y) * (height - y),
      );
    } else {
      maxRadius = Math.sqrt((width - x) * (width - x) + y * y);
    }
  } else {
    if (y < height / 2) {
      maxRadius = Math.sqrt(x * x + (height - y) * (height - y));
    } else {
      maxRadius = Math.sqrt(x * x + y * y);
    }
  }

  maxRadius = maxRadius + LIMIT;

  return maxRadius;
};
