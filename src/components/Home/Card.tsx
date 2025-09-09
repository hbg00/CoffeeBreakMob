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

const Card = ({
    id,
    type,
    roast_type,
    imagelink_square,
    name,
    price,
    buttonPressHandler,
}: CardProps) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardContainer}
            colors={[colors.orange, colors.darkCarmel]}
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

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                    buttonPressHandler({
                        id,
                        type,
                        roast_type,
                        imagelink_square,
                        name,
                        price,
                    });
                    }}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            </View>
        </LinearGradient>
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
    addButton: {
        backgroundColor: colors.orange,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    addButtonText: {
        color: colors.white,
        fontSize: 24,
        fontWeight: "bold",
        lineHeight: 28,
    },
});
