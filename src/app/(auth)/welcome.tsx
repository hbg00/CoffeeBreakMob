import { StyleSheet, View } from "react-native";
import React from "react";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";

import ScreenWrapper from "@/components/ComponentsUtils/ScreenWrapper";
import Typo from "@/components/ComponentsUtils/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import Button from "@/components/Shared/Button";
import { verticalScale } from "@/utils/screenScale";

const Welcome = () => {
    const router = useRouter();

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View>
                    <Button onPress={()=>{router.push("/(auth)/login")}} style={styles.loginButton}>
                        <Typo size={20} color={colors.white} fontWeight={"600"}>
                            Sign In
                        </Typo>
                    </Button>
                    <Animated.Image
                        entering={FadeIn.duration(500)}
                        source={require("../../assets/images/welcome_image.png")}
                        style={styles.welcomeImage}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.footer}>
                    <Animated.View
                        entering={FadeInDown.duration(1000)
                            .springify()
                            .damping(12)}
                        style={{alignItems:"center"}}
                    >
                        <Typo size={28} fontWeight={"800"} color={colors.darkCoffee}>
                            Ready for a Coffee Break?
                        </Typo>
                    </Animated.View>

                    <Animated.View 
                        entering={FadeInDown.duration(1000)
                            .delay(100)
                            .springify()
                            .damping(12)}
                        style={{alignItems: 'center', gap: 2}}>
                        <Typo size={15} color={colors.coffee} fontWeight={"600"}>
                            Explore our menu and get your coffee now!
                        </Typo>
                    </Animated.View>

                    <Animated.View 
                        entering={FadeInDown.duration(1000)
                            .delay(200)
                            .springify()
                            .damping(12)}
                        style={styles.buttonContainer}>
                        <Button onPress={()=>{router.push("/(auth)/register")}}>
                            <Typo size={22} color={colors.white} fontWeight={"600"}>
                               Register and Get Coffee!
                            </Typo>
                        </Button>
                    </Animated.View>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "space-between",
        paddingTop: spacingY._7,
    },
    welcomeImage:{
        width: "100%",
        height: verticalScale(300),
        alignSelf: "center",
        marginTop: verticalScale(100),
    },
    loginButton: {
        alignSelf: "flex-end",
        marginRight: spacingX._20,
        width: "30%",
    },
    footer: {
        alignItems: "center",
        paddingTop: verticalScale(30),
        paddingBottom: verticalScale(45),
        gap: spacingY._10, 
    },
    buttonContainer: {
        width: "100%",
        padding: spacingX._40,
    },
});     