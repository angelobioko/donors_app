import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ImageScreenWrapper ({children,bgImage}) {
    const {top} = useSafeAreaInsets();
    const paddingTop = top>0? top+5 : 30;
    // const paddingTop = 0;
      return (
        <ImageBackground
        source={bgImage} // The background image source
        style={{ flex: 1, paddingTop }} // Ensures the image covers the screen
        resizeMode="cover" // Optional: makes sure the image covers the entire background
      >
        <View style={{ flex: 1 }}>
          {children}
        </View>
      </ImageBackground>
    );
  }
  
