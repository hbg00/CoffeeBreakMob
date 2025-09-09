import { StatusBar, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { ScreenWrapperProps } from "@/constants/types/types";
import { colors } from "@/constants/theme";

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  return (
    <ScrollView
      style={[
        {
          paddingTop: 50,
          flex: 1,
          backgroundColor: colors.darkCarmel,
        },
        style,
      ]}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.white} />
      {children}
    </ScrollView>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
