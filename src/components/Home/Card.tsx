import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

import Typo from "../Shared/Typo";
import { ProductCard } from "@/constants/types/homeTypes";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useFavorites } from "@/context/favContext";

type CardProps = ProductCard & {
  onCardPress: (product: ProductCard) => void;
};

const Card = ({
  id,
  name,
  description,
  categoryLabel,
  price,
  currency,
  imageSource,
  productType,
  raw,
  onCardPress,
}: CardProps) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isFav = isFavorite(id);

  const product: ProductCard = {
    id,
    name,
    description: description ?? "",
    categoryLabel,
    price,
    currency,
    imageSource: imageSource ?? require("../../assets/images/coffee_temp.jpg"),
    productType,
    raw,
  };

  const toggleFavorite = () => {
    if (isFav) {
      removeFromFavorites(id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onCardPress(product)}
      style={styles.outerContainer}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardContainer}
        colors={[colors.black, colors.darkCarmel]}
      >
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Ionicons
            name={isFav ? "heart" : "heart-outline"}
            size={20}
            color={isFav ? colors.orange : colors.white}
          />
        </TouchableOpacity>

        <Image
          source={imageSource ?? require("../../assets/images/coffee_temp.jpg")}
          style={styles.cardImage}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <Typo style={styles.cardTitle}>{name}</Typo>
          <Typo style={styles.cardInfo}>{categoryLabel}</Typo>

          <View style={styles.priceRow}>
            <Typo style={styles.priceText}>
              {(price ?? 0).toFixed(2)} {currency}
            </Typo>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  outerContainer: {
    width: 175,
    borderRadius: radius._20,
  },
  cardContainer: {
    width: "100%",
    borderRadius: radius._20,
    overflow: "visible",
    position: "relative",
  },
  favoriteButton: {
    position: "absolute",
    top: spacingY._5,
    right: spacingX._5,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: radius._15,
    padding: 5,
    zIndex: 10,
  },
  cardImage: {
    height: 120,
    width: "100%",
    borderRadius: radius._20,
  },
  infoContainer: {
    padding: spacingX._12,
    gap: spacingY._5,
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
    marginTop: spacingY._10,
  },
  priceText: {
    color: colors.orange,
    fontSize: 16,
    fontWeight: "600",
  },
});
