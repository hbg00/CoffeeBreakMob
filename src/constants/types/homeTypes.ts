import { ImageProps } from "react-native";

export interface CardProps {
    id: number;
    type: string;
    roast_type: string;
    imagelink_square: ImageProps["source"];
    name: string;
    price: number;
    buttonPressHandler: any;
}

export interface CoffeeItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    roast_type: string;
    origin: string[];
    additions: string[];
}