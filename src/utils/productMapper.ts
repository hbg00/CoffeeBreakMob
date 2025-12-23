import {
  CoffeeDto,
  TeaDto,
  CakeDto,
  CookieDto,
  ProductCard,
} from "@/constants/types/homeTypes";

const defaultImage = require("../assets/images/coffee_temp.jpg");

export const mapCoffeeDtoToCard = (dto: CoffeeDto): ProductCard => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  categoryLabel: dto.coffeeType?.toString() ?? "",
  price: dto.price,
  currency: dto.currency,
  imageSource: defaultImage,
  productType: "Coffee",
  raw: dto,
});

export const mapTeaDtoToCard = (dto: TeaDto): ProductCard => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  categoryLabel: dto.teaType?.toString() ?? "",
  price: dto.price,
  currency: dto.currency,
  imageSource: defaultImage,
  productType: "Tea",
  raw: dto,
});

export const mapCakeDtoToCard = (dto: CakeDto): ProductCard => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  categoryLabel: dto.cakeType?.toString() ?? "",
  price: dto.price,
  currency: dto.currency,
  imageSource: defaultImage,
  productType: "Cake",
  raw: dto,
});

export const mapCookieDtoToCard = (dto: CookieDto): ProductCard => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  categoryLabel: dto.cookieType?.toString() ?? "",
  price: dto.price,
  currency: dto.currency,
  imageSource: defaultImage,
  productType: "Cookie",
  raw: dto,
});
