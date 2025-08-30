import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ComponentsUtils/ScreenWrapper';
import { colors } from '@/constants/theme';

const Profile = () => {
  return (
    <ScreenWrapper style={{ backgroundColor: colors.white }}>
      <Text>Profile</Text>
    </ScreenWrapper>
  )
}

export default Profile;

const styles = StyleSheet.create({})