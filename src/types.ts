import React, { ReactNode } from 'react';

import {
    TextProps,
    TextStyle,
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
