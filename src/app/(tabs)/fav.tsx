import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import ScreenWrapper from "@/components/Shared/ScreenWrapper";
import Typo from "@/components/Shared/Typo";
import HeadBar from "@/components/Home/HeadBar";
import Card from "@/components/Home/Card";

import { colors, spacingX, spacingY } from "@/constants/theme";
import { coffees } from "@/data/coffeeMocks";
import { CoffeeItem } from "@/constants/types/homeTypes";

const Fav = () => {
  const [favorites] = useState<CoffeeItem[]>(coffees.slice(0, 4));

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <HeadBar />

        <Typo size={24} color={colors.darkCoffee} fontWeight="bold">
          Your Favorites
        </Typo>

        {favorites.length === 0 ? (
          <Typo size={18} color={colors.coffee}>
            You don’t have any favorite coffees yet ☕
          </Typo>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <Card
                  id={item.id}
                  type={item.category}
                  roast_type={item.roast_type}
                  imagelink_square={require("../../assets/images/coffee_temp.jpg")}
                  name={item.name}
                  price={item.price}
                  buttonPressHandler={() => {
                    console.log("Mock: removed from favorites →", item.name);
                  }}
                />
              </View>
            )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{
              gap: spacingY._20,
              paddingVertical: spacingY._10,
            }}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._20,
    paddingHorizontal: spacingX._20,
  },
  cardWrapper: {
    flex: 1,
    marginBottom: spacingY._20,
    maxWidth: "48%",
  },
});

export default Fav;
