import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { CustomButtonProps } from '@/constants/types/types';
import { colors, radius } from "@/constants/theme";
import { verticalScale } from '@/utils/screenScale';
import Loading from './Loading';

const Button = ({
    style,  
    onPress,
    loading = false,
    children
}: CustomButtonProps) => {
  
    if(loading){
        return (
            <View style={[styles.button, style, {backgroundColor: 'transparent'}]}>
                <Loading/>
            </View>
        )
    }
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            {children}
        </TouchableOpacity>
    );
};

export default Button

const styles = StyleSheet.create({
    button:{
        backgroundColor: colors.orange,
        borderRadius: radius._12,
        borderCurve: 'continuous',
        height: verticalScale(52),
        justifyContent: "center",
        alignItems: 'center',
    }
});