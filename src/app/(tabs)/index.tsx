import React, { useState, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";

import { coffees, getCategories } from "../../data/coffeeMocks";
import { CoffeeItem } from "@/constants/types/homeTypes";
import Typo from "@/components/Shared/Typo";
import ScreenWrapper from "@/components/Shared/ScreenWrapper";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import HeadBar from "@/components/Home/HeadBar";
import { useAuth } from "@/context/authContext";
import Card from "@/components/Home/Card";
import DetailModal from "../(modals)/detailModal";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { user } = useAuth();

  const categories = getCategories();
  const ListRef = useRef<FlatList<CoffeeItem>>(null);

  const getCoffeeList = (category: string, data: CoffeeItem[]) => {
    if (category === "All") return data;
    return data.filter((item) => item.category === category);
  };

  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });

  const [coffee, setCoffee] = useState(
    getCoffeeList(categoryIndex.category, coffees)
  );

  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const addToBasket = (coffeeItem: CoffeeItem) => {
    console.log("Added to basket:", coffeeItem);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <HeadBar />

        <View>
          <Typo size={24} color={colors.darkCoffee} fontWeight={"bold"}>
            Hi, {user?.name ?? "Adam"}
          </Typo>

          <Typo size={20} color={colors.coffee} fontWeight={"bold"}>
            How we can make your day better?
          </Typo>
        </View>

        <View>
          <Typo size={24} color={colors.darkCoffee} fontWeight={"bold"}>
            Types of coffees
          </Typo>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScrollView}
          >
            {categories.map((data, index) => (
              <TouchableOpacity
                key={index.toString()}
                style={[
                  styles.categoryPill,
                  categoryIndex.index === index && styles.activeCategoryPill,
                ]}
                onPress={() => {
                  setCategoryIndex({ index, category: data });
                  setCoffee(getCoffeeList(data, coffees));
                  ListRef.current?.scrollToOffset({ offset: 0, animated: true });
                }}
              >
                <Typo
                  style={[
                    styles.categoryText,
                    categoryIndex.index === index && styles.activeCategoryText,
                  ]}
                >
                  {data}
                </Typo>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Typo size={24} color={colors.darkCoffee} fontWeight={"bold"}>
            Coffees
          </Typo>

          <FlatList
            ref={ListRef}
            data={coffee}
            renderItem={({ item }) => (
              <Card
                id={item.id}
                type={item.category}
                roast_type={item.roast_type}
                imagelink_square={require("../../assets/images/coffee_temp.jpg")}
                name={item.name}
                price={item.price}
                buttonPressHandler={addToBasket}
                onCardPress={(coffeeItem: CoffeeItem) => {
                  setSelectedCoffee(coffeeItem);
                  setModalVisible(true);
                }}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: spacingX._20,
              paddingVertical: spacingY._10,
            }}
          />
        </View>

        <DetailModal
          visible={modalVisible}
          coffee={selectedCoffee}
          onClose={() => setModalVisible(false)}
          onAddToCart={(coffeeItem: CoffeeItem) => addToBasket(coffeeItem)}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  categoryScrollView: {
    paddingVertical: spacingY._10,
    gap: spacingX._10,
  },
  categoryPill: {
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._7,
    borderRadius: radius._10,
    borderWidth: 1,
    borderColor: colors.lightOrange,
    backgroundColor: colors.lightOrange,
  },
  activeCategoryPill: {
    backgroundColor: colors.orange,
    borderColor: colors.orange,
  },
  categoryText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: "600",
  },
  activeCategoryText: {
    color: colors.white,
    fontWeight: "bold",
  },
  cardRow: {
    justifyContent: "space-between",
    marginBottom: spacingY._20,
  },
});

export default Home;
