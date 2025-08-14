import { StyleSheet } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ComponentsUtils/ScreenWrapper'
import Typo from '@/components/ComponentsUtils/Typo'

const Welcome = () => {
  return (
    <ScreenWrapper>
      <Typo size={30} fontWeight="700" color="#000">
        welcome page
      </Typo>
    </ScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({})