import logo from "@/assets/logo.asset.json";
import botanicalLife from "@/assets/botanical-life.asset.json";
import botanicalProd from "@/assets/botanical-prod.asset.json";
import cocoaLife from "@/assets/cocoa-life.asset.json";
import cocoaProd from "@/assets/cocoa-prod.asset.json";
import houndsLife from "@/assets/hounds-life.asset.json";
import houndsProd from "@/assets/hounds-prod.asset.json";
import onyxLife from "@/assets/onyx-life.asset.json";
import onyxProd from "@/assets/onyx-prod.asset.json";

export const ASSETS = {
  logo: logo.url,
};

export type ColorKey = "botanical" | "houndstooth" | "cocoa" | "onyx";

export interface ColorOption {
  key: ColorKey;
  name: string;
  swatch: string;
  images: string[];
}

export const COLORS: ColorOption[] = [
  {
    key: "botanical",
    name: "Botanical Leaf",
    swatch: "#E8E4D6",
    images: [botanicalLife.url, botanicalProd.url],
  },
  {
    key: "houndstooth",
    name: "Soft Houndstooth",
    swatch: "#D9CFBE",
    images: [houndsLife.url, houndsProd.url],
  },
  {
    key: "cocoa",
    name: "Warm Cocoa",
    swatch: "#5B3A2B",
    images: [cocoaLife.url, cocoaProd.url],
  },
  {
    key: "onyx",
    name: "Classic Onyx",
    swatch: "#1F1F1F",
    images: [onyxLife.url, onyxProd.url],
  },
];

export const HERO_IMAGE = botanicalLife.url;
