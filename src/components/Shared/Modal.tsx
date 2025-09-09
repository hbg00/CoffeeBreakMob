import { StyleSheet, View } from 'react-native';
import React from 'react';
import { colors, spacingY } from '@/constants/theme';
import { ModalProps } from '@/constants/types/types';

const Modal = ({
    style,
    children,
    bg = colors.darkCarmel
} : ModalProps ) => {
  return (
    <View style={[styles.container, style && style, {backgroundColor: bg}]}>
        {children}
    </View>
  );
};

export default Modal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: spacingY._10,
    }
});