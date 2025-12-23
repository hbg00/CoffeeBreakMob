import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import ScreenWrapper from "@/components/Shared/ScreenWrapper";
import Typo from "@/components/Shared/Typo";
import HeadBar from "@/components/Home/HeadBar";
import Card from "@/components/Home/Card";
import DetailModal from "../(modals)/detailModal";

import { colors, spacingX, spacingY } from "@/constants/theme";
import { ProductCard } from "@/constants/types/homeTypes";
import { useFavorites } from "@/context/favContext";
import { useBasket } from "@/context/basketContext";

const Fav = () => {
  const { favorites } = useFavorites();
  const { addToBasket } = useBasket();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductCard | null>(null);

  const handleCardPress = (product: ProductCard) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleAddToCart = (product: ProductCard) => {
    addToBasket(product);
    setModalVisible(false);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <HeadBar />

        <Typo size={24} color={colors.darkCoffee} fontWeight="bold">
          Your Favorites
        </Typo>

        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Typo size={18} color={colors.coffee}>
              You don’t have any favorite items yet
            </Typo>
          </View>
        ) : (
          <FlatList<ProductCard>
            data={favorites}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <Card
                  {...item}
                  onCardPress={handleCardPress}
                />
              </View>
            )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{
              paddingVertical: spacingY._10,
              paddingBottom: 100,
            }}
          />
        )}
      </View>

      <DetailModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={() => setModalVisible(false)}
        onAddToCart={handleAddToCart}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacingY._50,
  },
  cardWrapper: {
    width: "48%",
    marginBottom: spacingY._20,
  },
});

export default Fav;
