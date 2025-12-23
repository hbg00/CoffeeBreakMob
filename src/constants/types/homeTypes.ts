import { ImageSourcePropType } from "react-native";

export type ProductKind = "Coffee" | "Tea" | "Cake" | "Cookie";

export type CoffeeDto = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  coffeeType: string;
  size: string;
  hasMilk: boolean;
};

export type TeaDto = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  teaType: string;
  isHerbal: boolean;
};

export type CakeDto = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  cakeType: string;
  isGlutenFree: boolean;
  calories: number;
};

export type CookieDto = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  cookieType: string;
  hasChocolate: boolean;
};

export type ProductCard = {
  id: string;
  name: string;
  description: string;
  categoryLabel: string;
  price: number;
  currency: string;
  imageSource: ImageSourcePropType;
  productType: ProductKind;
  raw: any;
};

export type DetailModalProps = {
  visible: boolean;
  product: ProductCard | null;
  onClose: () => void;
  onAddToCart: (product: ProductCard) => void;
};

export type FavoriteContextType = {
  favorites: ProductCard[];
  addToFavorites: (product: ProductCard) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
};
