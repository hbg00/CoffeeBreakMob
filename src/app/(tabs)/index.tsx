import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { CoffeeItem, coffees, getCategories } from '../../data/coffeeMocks';
import Typo from '@/components/ComponentsUtils/Typo';
import ScreenWrapper from '@/components/ComponentsUtils/ScreenWrapper';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import HeadBar from '@/components/Home/HeadBar';
import { useAuth } from '@/context/authContext';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { user } = useAuth();

  const categories = getCategories();
  const ListRef = useRef<FlatList<CoffeeItem>>(null);

  const getCoffeeList = (category: string, data: CoffeeItem[]) => {
    if (category === "All") return data;
    return data.filter(item => item.category === category);
  };

  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });

  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, coffees),
  );

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
                        setSortedCoffee(getCoffeeList(data, coffees));
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

        </View>

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
    fontWeight: "600"
  },
  activeCategoryText: {
    color: colors.white,
    fontWeight: "bold",
  },
});

export default Home;
