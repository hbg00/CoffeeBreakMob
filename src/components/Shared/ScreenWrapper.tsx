import { StatusBar, StyleSheet,  } from "react-native";
import React from "react";
import { ScreenWrapperProps } from "@/constants/types/types";
import { colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: colors.darkCarmel,
          paddingTop: 50,
        },
        style,
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.white} />
      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
