import { StyleSheet, Text } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ComponentsUtils/ScreenWrapper'
import { useRouter } from 'expo-router';
import { colors } from '@/constants/theme';



const Home = () => {
  const router = useRouter();

  return (
    <ScreenWrapper style={{ backgroundColor: colors.white }}>
      <Text>index</Text>
    </ScreenWrapper>
  )
}

export default Home;

const styles = StyleSheet.create({
})