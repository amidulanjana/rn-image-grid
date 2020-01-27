import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import GalleryScreen from './screens/Gallery';
import CameraScreen from './screens/CameraScreen'
import StatusScreen from './screens/StatusScreen'
import CommentScreen from './screens/CommentScreen'

const AppNavigator = createAppContainer(
  createStackNavigator({
    gallery: GalleryScreen,
    camera: CameraScreen,
    status: StatusScreen,
    comment: CommentScreen
  }, {
    initialRouteName: 'gallery'
  })
);

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
