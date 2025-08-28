import { Image, StyleSheet, View, InteractionManager } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/utils/screenScale";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      const timer = setTimeout(() => {
        router.replace("/(auth)/welcome");
      }, 2000);
      return () => clearTimeout(timer);
    });
    return () => task.cancel();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("../assets/images/index_image.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.darkCarmel,
  },
  logo: {
    width: "100%",
    height: verticalScale(300),
    alignSelf: "center",
  },
});
