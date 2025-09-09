import { StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from "expo-router";
import BottomTabsBar from '@/components/Nav/BottomTabsNav';

const _layout = () => {
  return (
    <Tabs tabBar={BottomTabsBar} screenOptions={{headerShown: false}}>
      <Tabs.Screen name="index"/>
      <Tabs.Screen name="basket"/>
      <Tabs.Screen name="fav"/>
      <Tabs.Screen name="profile"/>
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});