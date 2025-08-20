import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import ScreenWrapper from '@/components/ComponentsUtils/ScreenWrapper'

const Register = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text>Register</Text>
      </View>
    </ScreenWrapper>
  )
}

export default Register

const styles = StyleSheet.create({
      container:{
          backgroundColor: colors.white
      },
})