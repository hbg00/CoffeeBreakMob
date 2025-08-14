import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import { colors } from '@/constants/theme';

const Index = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.replace('/(auth)/welcome');
        }, 10000);
    }, []);

    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
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
        height: "20%",
        aspectRatio: 1,
    },
});