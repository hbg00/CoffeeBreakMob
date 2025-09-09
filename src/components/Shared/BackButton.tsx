import { StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { BakcButtonProps } from '@/constants/types/types';
import { colors, radius } from '@/constants/theme';
import { verticalScale } from '@/utils/screenScale';
import { CaretLeftIcon } from "phosphor-react-native";

const BackButton = ({
  style,
  iconSize = 26, 
}: BakcButtonProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={[styles.button, style]}
    >
      <CaretLeftIcon
        size={verticalScale(iconSize)}
        color={colors.white}
        weight="bold"  
      />
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({
      button: {
        backgroundColor: colors.orange,
        alignSelf: "flex-start",
        borderRadius: radius._12,
        borderCurve: "continuous",
        padding: 5,
    }
})