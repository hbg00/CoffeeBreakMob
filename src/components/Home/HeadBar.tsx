import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import Input from '../Shared/Input'

import *  as Icons from "phosphor-react-native";
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/screenScale';

const HeadBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileImgContainer}>
        <Image
          source={require("../../assets/images/tempProfile.png")}
          style={styles.profileImg}
        />
      </View>

      <Input
        placeholder="Search for your product..."
        containerStyle={styles.inputContainer}  
        inputStyle={styles.input}               
        icon={
          <Icons.MagnifyingGlassIcon
            size={verticalScale(28)}
            color={colors.darkCoffee}
            weight="bold"
          />
        }
      />

      <View style={styles.notificationContainer}>
          <Icons.BellIcon
            size={verticalScale(28)}
            color={colors.darkCoffee}
            weight="bold"
            />
      </View>
    </View>
  )
}

export default HeadBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImgContainer: {
    marginTop: spacingY._5,
    height: spacingY._40,
    width: spacingX._40,
    borderRadius: radius._20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profileImg: {
    height: spacingY._40,
    width: spacingX._40,  
  },
  inputContainer: {
    width: verticalScale(235),
  },
  input: {
  },
  notificationContainer: {

  },
  notification: {

  }
})