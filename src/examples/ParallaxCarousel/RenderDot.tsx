import React from 'react';
import {View} from 'react-native';

export const DOT_SIZE = 15;

interface RenderDotProps {
  isSelected?: boolean;
}

export const RenderDot = ({isSelected = false}: RenderDotProps) => {
  return (
    <View
      style={{
        height: DOT_SIZE,
        width: DOT_SIZE,
        borderRadius: DOT_SIZE,
        backgroundColor: isSelected ? '#000' : '#ddd',
      }}
    />
  );
};
