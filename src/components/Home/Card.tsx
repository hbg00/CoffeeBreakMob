import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Typo from "../Shared/Typo";
import { CardProps } from "@/constants/types/homeTypes";
import { colors, radius, spacingX } from "@/constants/theme";

type ExtendedCardProps = CardProps & {
    onCardPress: (coffee: CardProps) => void;
};

const Card = ({
    id,
    type,
    roast_type,
    imagelink_square,
    name,
    price,
    buttonPressHandler,
    onCardPress,
}: ExtendedCardProps) => {
    const coffeeData = {
        id,
        type,
        roast_type,
        imagelink_square,
        name,
        price,
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onCardPress(coffeeData)}
        >
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardContainer}
                colors={[colors.black, colors.darkCarmel]}
            >
                <Image
                    source={require("../../assets/images/coffee_temp.jpg")}
                    style={styles.cardImage}
                    resizeMode="cover"
                />

                <View style={styles.infoContainer}>
                    <Typo style={styles.cardTitle}>{name}</Typo>
                    <Typo style={styles.cardInfo}>{roast_type}</Typo>

                    <View style={styles.priceRow}>
                        <Typo style={styles.priceText}>${price}</Typo>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default Card;

const styles = StyleSheet.create({
    cardContainer: {
        width: 175,
        borderRadius: radius._20,
        overflow: "hidden",
    },
    cardImage: {
        height: 120,
        width: "100%",
    },
    infoContainer: {
        padding: spacingX._12,
        gap: spacingX._5,
    },
    cardTitle: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 16,
    },
    cardInfo: {
        color: colors.carmel,
        fontSize: 14,
    },
    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: spacingX._10,
    },
    priceText: {
        color: colors.orange,
        fontSize: 16,
        fontWeight: "600",
    },
});
