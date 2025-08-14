import { StatusBar, StyleSheet, View } from 'react-native'
import React from 'react'
import { ScreenWrapperProps } from '@/types';
import { colors } from '@/constants/theme';

const ScreenWrapper = ( { style, children}: ScreenWrapperProps ) => {
  return (
    <View
      style={[
      {
        paddingTop: 50,
        flex: 1,
        backgroundColor: colors.carmel,
      },
      style,
      ]}
      >
        <StatusBar barStyle="light-content" backgroundColor={colors.white}/>
        {children}
      </View>
  );
}

export default ScreenWrapper

const styles = StyleSheet.create({})