import React, { ReactNode } from 'react';

import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export type AuthContextType = {
  user: UserType;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; msg?: string }>;
  register: (
    email: string,
    password: string,
    name: string,
    surname: string,
    phoneNumber: string,
  ) => Promise<{ success: boolean; msg?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; msg?: string }>;
};

export type UserType = {
  uid: string;
  email: string | null;
  name?: string | null;
  surname?: string | null;
  phoneNumber?: string | null;
} | null;

export type ScreenWrapperProps = {
    style?: ViewStyle
    children: ReactNode;
    bg? : string;
}

export type TypoProps = {
  size?: number;
  color?: string;
  fontWeight?: TextStyle["fontWeight"];
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  textProps?: TextProps;
};

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

export type ModalProps = {
    style?: ViewStyle;
    children: React.ReactNode;
    bg?: string;
};