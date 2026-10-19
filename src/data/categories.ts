import type { CategoryDoc } from "../types/index";

export const CATEGORIES: CategoryDoc[] = [
  {
    code: "PERSONAL",
    name: "Personal Item",
    description: "Wallets, keys, bags, clothing, IDs",
  },
  {
    code: "ACCESSORY",
    name: "Accessory",
    description: "Umbrellas, eyeglasses, watches, jewelry",
  },
  {
    code: "ELECTRONICS",
    name: "Electronics",
    description: "Laptops, phones, chargers, headphones",
  },
  {
    code: "DOCUMENT",
    name: "Document",
    description: "Books, notebooks, official paperwork",
  },
  {
    code: "OTHER",
    name: "Other",
    description: "Miscellaneous lost property",
  },
];
