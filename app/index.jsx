import React from 'react';
import { View, Button, Text } from 'react-native';
import {useRouter} from 'expo-router'
import ScreenWrapper from '../components/ScreenWrapper';
import Loading from '../components/Loading';

export default function index() {
    const router = useRouter();
  return (
    <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
      <Loading/>
    </View>
  );
}