import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ListRenderItemInfo,
} from "react-native";

import ScreenWrapper from "@/components/Shared/ScreenWrapper";
import Typo from "@/components/Shared/Typo";
import HeadBar from "@/components/Home/HeadBar";
import Card from "@/components/Home/Card";
import DetailModal from "../(modals)/detailModal";

import { colors, spacingX, spacingY, radius } from "@/constants/theme";
import { useAuth } from "@/context/authContext";
import { useBasket } from "@/context/basketContext";

import {
  ProductCard,
  CoffeeDto,
  TeaDto,
  CakeDto,
  CookieDto,
} from "@/constants/types/homeTypes";

import {
  getCoffeesApi,
  getTeasApi,
  getCakesApi,
  getCookiesApi,
  getCoffeeTypesApi,
  getTeaTypesApi,
  getCakeTypesApi,
  getCookieTypesApi,
} from "@/api/productApi";

import { mapCakeDtoToCard, mapCoffeeDtoToCard, mapCookieDtoToCard, mapTeaDtoToCard } from "@/utils/productMapper";


const Home = () => {
  const { user } = useAuth();
  const { addToBasket } = useBasket();

  const [coffeeTypes, setCoffeeTypes] = useState<string[]>(["All"]);
  const [teaTypes, setTeaTypes] = useState<string[]>(["All"]);
  const [cakeTypes, setCakeTypes] = useState<string[]>(["All"]);
  const [cookieTypes, setCookieTypes] = useState<string[]>(["All"]);

  const [selectedCoffeeTypeIndex, setSelectedCoffeeTypeIndex] = useState(0);
  const [selectedTeaTypeIndex, setSelectedTeaTypeIndex] = useState(0);
  const [selectedCakeTypeIndex, setSelectedCakeTypeIndex] = useState(0);
  const [selectedCookieTypeIndex, setSelectedCookieTypeIndex] = useState(0);

  const [coffeesAll, setCoffeesAll] = useState<ProductCard[]>([]);
  const [teasAll, setTeasAll] = useState<ProductCard[]>([]);
  const [cakesAll, setCakesAll] = useState<ProductCard[]>([]);
  const [cookiesAll, setCookiesAll] = useState<ProductCard[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<ProductCard | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const coffeeListRef = useRef<FlatList<ProductCard> | null>(null);
  const teaListRef = useRef<FlatList<ProductCard> | null>(null);
  const cakeListRef = useRef<FlatList<ProductCard> | null>(null);
  const cookieListRef = useRef<FlatList<ProductCard> | null>(null);

  useEffect(() => {
    const load = async () => {
      const [
        coffeeRes,
        teaRes,
        cakeRes,
        cookieRes,
        coffeeTypesRes,
        teaTypesRes,
        cakeTypesRes,
        cookieTypesRes,
      ] = await Promise.all([
        getCoffeesApi(),
        getTeasApi(),
        getCakesApi(),
        getCookiesApi(),
        getCoffeeTypesApi(),
        getTeaTypesApi(),
        getCakeTypesApi(),
        getCookieTypesApi(),
      ]);

      if (coffeeRes.success && coffeeRes.data) {
        setCoffeesAll(coffeeRes.data.map((dto: CoffeeDto) => mapCoffeeDtoToCard(dto)));
      }
      if (teaRes.success && teaRes.data) {
        setTeasAll(teaRes.data.map((dto: TeaDto) => mapTeaDtoToCard(dto)));
      }
      if (cakeRes.success && cakeRes.data) {
        setCakesAll(cakeRes.data.map((dto: CakeDto) => mapCakeDtoToCard(dto)));
      }
      if (cookieRes.success && cookieRes.data) {
        setCookiesAll(cookieRes.data.map((dto: CookieDto) => mapCookieDtoToCard(dto)));
      }

      if (coffeeTypesRes.success && coffeeTypesRes.data) {
        setCoffeeTypes(["All", ...coffeeTypesRes.data]);
      }
      if (teaTypesRes.success && teaTypesRes.data) {
        setTeaTypes(["All", ...teaTypesRes.data]);
      }
      if (cakeTypesRes.success && cakeTypesRes.data) {
        setCakeTypes(["All", ...cakeTypesRes.data]);
      }
      if (cookieTypesRes.success && cookieTypesRes.data) {
        setCookieTypes(["All", ...cookieTypesRes.data]);
      }
    };

    load();
  }, []);

  const selectedCoffeeType = coffeeTypes[selectedCoffeeTypeIndex] ?? "All";
  const selectedTeaType = teaTypes[selectedTeaTypeIndex] ?? "All";
  const selectedCakeType = cakeTypes[selectedCakeTypeIndex] ?? "All";
  const selectedCookieType = cookieTypes[selectedCookieTypeIndex] ?? "All";

  const filteredCoffees =
    selectedCoffeeType === "All"
      ? coffeesAll
      : coffeesAll.filter((p) => p.categoryLabel === selectedCoffeeType);

  const filteredTeas =
    selectedTeaType === "All"
      ? teasAll
      : teasAll.filter((p) => p.categoryLabel === selectedTeaType);

  const filteredCakes =
    selectedCakeType === "All"
      ? cakesAll
      : cakesAll.filter((p) => p.categoryLabel === selectedCakeType);

  const filteredCookies =
    selectedCookieType === "All"
      ? cookiesAll
      : cookiesAll.filter((p) => p.categoryLabel === selectedCookieType);

  const handleCardPress = (product: ProductCard) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleAddToCart = (product: ProductCard) => {
    addToBasket(product);
    setModalVisible(false);
  };

  const renderHorizontalList = (
    data: ProductCard[],
    ref: React.RefObject<FlatList<ProductCard>>
  ) => (
    <FlatList<ProductCard>
      ref={ref}
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.productsList}
      renderItem={({ item }: ListRenderItemInfo<ProductCard>) => (
        <Card {...item} onCardPress={handleCardPress} />
      )}
      keyExtractor={(item) => item.id}
    />
  );

  const renderTypesRow = (
    types: string[],
    selectedIndex: number,
    onSelect: (index: number) => void,
    ref: React.RefObject<FlatList<ProductCard>>
  ) => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryScrollView}
    >
      {types.map((t, index) => (
        <TouchableOpacity
          key={index.toString()}
          style={[
            styles.categoryPill,
            selectedIndex === index && styles.activeCategoryPill,
          ]}
          onPress={() => {
            onSelect(index);
            ref.current?.scrollToOffset({ offset: 0, animated: true });
          }}
        >
          <Typo
            style={[
              styles.categoryText,
              selectedIndex === index && styles.activeCategoryText,
            ]}
          >
            {t}
          </Typo>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1}}
    >
      <ScreenWrapper>
        <View style={styles.container}>
          <HeadBar />

          <View>
            <Typo size={24} color={colors.darkCoffee} fontWeight="bold">
              Hi, {user?.firstName ?? "Guest"}
            </Typo>
            <Typo size={20} color={colors.coffee} fontWeight="bold">
              How we can make your day better?
            </Typo>
          </View>

          <View>
            <Typo size={18} color={colors.darkCoffee} fontWeight="bold">
              Coffee types
            </Typo>
            {renderTypesRow(
              coffeeTypes,
              selectedCoffeeTypeIndex,
              setSelectedCoffeeTypeIndex,
              coffeeListRef
            )}
            <Typo size={22} color={colors.darkCoffee} fontWeight="bold">
              Coffees
            </Typo>
            {renderHorizontalList(filteredCoffees, coffeeListRef)}
          </View>

          <View style={styles.section}>
            <Typo size={18} color={colors.darkCoffee} fontWeight="bold">
              Tea types
            </Typo>
            {renderTypesRow(
              teaTypes,
              selectedTeaTypeIndex,
              setSelectedTeaTypeIndex,
              teaListRef
            )}
            <Typo size={22} color={colors.darkCoffee} fontWeight="bold">
              Teas
            </Typo>
            {renderHorizontalList(filteredTeas, teaListRef)}
          </View>

          <View>
            <Typo size={18} color={colors.darkCoffee} fontWeight="bold">
              Cake types
            </Typo>
            {renderTypesRow(
              cakeTypes,
              selectedCakeTypeIndex,
              setSelectedCakeTypeIndex,
              cakeListRef
            )}
            <Typo size={22} color={colors.darkCoffee} fontWeight="bold">
              Cakes
            </Typo>
            {renderHorizontalList(filteredCakes, cakeListRef)}
          </View>

          <View>
            <Typo size={18} color={colors.darkCoffee} fontWeight="bold">
              Cookie types
            </Typo>
            {renderTypesRow(
              cookieTypes,
              selectedCookieTypeIndex,
              setSelectedCookieTypeIndex,
              cookieListRef
            )}
            <Typo size={22} color={colors.darkCoffee} fontWeight="bold">
              Cookies
            </Typo>
            {renderHorizontalList(filteredCookies, cookieListRef)}
          </View>
        </View>

        <DetailModal
          visible={modalVisible}
          product={selectedProduct}
          onClose={() => setModalVisible(false)}
          onAddToCart={handleAddToCart}
        />
      </ScreenWrapper>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    gap: spacingY._20,
  },
  categoryScrollView: {
    paddingVertical: spacingY._10,
    paddingRight: spacingX._10,
  },
  categoryPill: {
    paddingHorizontal: spacingX._15,
    paddingVertical: spacingY._7,
    borderRadius: radius._20,
    backgroundColor: colors.darkCoffee,
    marginRight: spacingX._10,
  },
  activeCategoryPill: {
    backgroundColor: colors.orange,
  },
  categoryText: {
    color: colors.carmel,
    fontWeight: "600",
    fontSize: 14,
  },
  activeCategoryText: {
    color: colors.white,
  },
  productsList: {
    gap: spacingX._20,
    paddingVertical: spacingY._10,
  },
});

