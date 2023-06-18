import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DotsRipple from './src/examples/DotsRipple';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <DotsRipple />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
