import { Image, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import { colors } from '@/constants/theme';
import { verticalScale } from '@/utils/screenScale';
import * as SystemUI from 'expo-system-ui';

const Index = () => {
    SystemUI.setBackgroundColorAsync(colors.carmel);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.replace('/(auth)/welcome');
        }, 2000);
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
};

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.carmel,
    },
    logo: {
        width: "100%",
        height: verticalScale(300),
        alignSelf: "center",
    },
});