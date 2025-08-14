import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'

const Register = () => {
  return (
    <View style={styles.container}>
      <Text>register</Text>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
      container:{
          backgroundColor: colors.white
      },
})