import React, { ReactNode } from 'react';

import {
    TextInput,
    TextInputProps,
    TextProps,
    TextStyle,
    TouchableOpacityProps,
    ViewStyle,
} from 'react-native';

export type ScreenWrapperProps = {
    style?: ViewStyle
    children: ReactNode;
    bg? : string;
}

export type TypoProps = {
    size?: number;
    color?: string;
    fontWeight?: TextStyle["fontWeight"];
    children: any | null;
    style?: TextStyle;
    textProps?: TextProps;
}

export type BakcButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
}

export interface CustomButtonProps extends TouchableOpacityProps {
  style?: ViewStyle;
  onPress?: () => void;
  loading?: boolean;
  hasShadow?: boolean;
  children: React.ReactNode;
}

export interface InputProps extends TextInputProps {
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputRef?: React.RefObject<TextInput>;
};

