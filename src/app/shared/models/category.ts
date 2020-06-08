export interface Categories {
  id: number;
  name: string;
}

export interface Category {
  categories: Categories;
}

export interface CategoriesResult {
  categories: Category[];
}
export enum CategoryEnum {
  Delivery = 1,
  NightLife = 3,
  Takeaway = 5,
  Breakfast = 8,
  Lunch = 9,
  Dinner = 10
}
