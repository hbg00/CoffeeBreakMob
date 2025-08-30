import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ComponentsUtils/ScreenWrapper'
import { colors } from '@/constants/theme'

const Fav = () => {
  return (
    <ScreenWrapper style={{ backgroundColor: colors.white }}>
      <Text>Fav</Text>
    </ScreenWrapper>
  )
}

export default Fav

const styles = StyleSheet.create({})