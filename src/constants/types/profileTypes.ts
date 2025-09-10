import { CoffeeItem } from "./homeTypes";

export type AccountOptionType = {
    title: string;
    icon: React.ReactNode;
    bgColor: string;
    routeName?: any;
};

export type DetailModalProps = {
  visible: boolean;
  coffee: CoffeeItem | null;
  onClose: () => void;
  onAddToCart: (coffee: CoffeeItem, size: string) => void;
};