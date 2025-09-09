import React, { useState } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import ScreenWrapper from "@/components/Shared/ScreenWrapper";
import Typo from "@/components/Shared/Typo";
import HeadBar from "@/components/Home/HeadBar";

import { colors, spacingX, spacingY } from "@/constants/theme";
import { coffees } from "@/data/coffeeMocks";
import { CoffeeItem } from "@/constants/types/homeTypes";

const Basket = () => {
  const [basket, setBasket] = useState<CoffeeItem[]>(coffees.slice(0, 4));

  const removeFromBasket = (id: number) => {
    setBasket((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = basket.reduce((sum, item) => sum + item.price, 0);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <HeadBar />

        <Typo size={24} color={colors.darkCoffee} fontWeight="bold">
          Your Basket
        </Typo>

        {basket.length === 0 ? (
          <Typo size={18} color={colors.coffee}>
            Your basket is empty
          </Typo>
        ) : (
          <>
            <FlatList
              data={basket}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={[colors.lightOrange, colors.darkCoffee]}
                  style={styles.row}
                >
                  <Image
                    source={require("../../assets/images/coffee_temp.jpg")}
                    style={styles.image}
                  />
                  <View style={styles.details}>
                    <Typo size={16} color="white" fontWeight="bold">
                      {item.name}
                    </Typo>
                    <Typo size={14} color="white">
                      ${item.price.toFixed(2)}
                    </Typo>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeFromBasket(item.id)}
                    style={styles.removeButton}
                  >
                    <Typo size={14} color="white" fontWeight="bold">
                      Remove
                    </Typo>
                  </TouchableOpacity>
                </LinearGradient>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                gap: spacingY._10,
                paddingVertical: spacingY._10,
              }}
            />

            <View style={styles.summary}>
              <Typo size={18} color={colors.darkCoffee} fontWeight="bold">
                Total: ${totalPrice.toFixed(2)}
              </Typo>

              <TouchableOpacity style={styles.checkoutButton}>
                <Typo size={18} color="white" fontWeight="bold">
                  Buy
                </Typo>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Basket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._20,
    paddingHorizontal: spacingX._20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: spacingX._10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: spacingX._10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  removeButton: {
    backgroundColor: colors.orange,
    paddingHorizontal: spacingX._10,
    paddingVertical: spacingY._5,
    borderRadius: 6,
  },
  summary: {
    marginTop: spacingY._20,
    paddingVertical: spacingY._20,
    borderTopWidth: 1,
    borderColor: colors.darkCoffee,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkoutButton: {
    backgroundColor: colors.orange,
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._10,
    borderRadius: 10,
  },
});
