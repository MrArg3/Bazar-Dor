// export interface Product {
//     id: number;
//     nameBn: string;
//     categoryNameBn: string;
//     image: string;
//     today: number;
//     unit: string;
//     change: {
//         dir: 'up' | 'down' | 'no-change';
//         pct: number;
//     };
// }

export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Unit = "kg" | "litre" | "dozen" | "piece";

export type Change = {
  dir: "up" | "down" | "flat";
  pct: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: Unit;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: Change;
  markets: Market[];
};

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};