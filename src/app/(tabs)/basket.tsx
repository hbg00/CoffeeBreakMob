import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ComponentsUtils/ScreenWrapper';
import { colors } from '@/constants/theme';

const Basket = () => {
  return (
    <ScreenWrapper style={{ backgroundColor: colors.white }}>
      <Text>Basket</Text>
    </ScreenWrapper>
  )
}

export default Basket;

const styles = StyleSheet.create({})