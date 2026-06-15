export enum Category {
  ONES = 'ONES',
  TWOS = 'TWOS',
  THREES = 'THREES',
  FOURS = 'FOURS',
  FIVES = 'FIVES',
  SIXES = 'SIXES',
  THREE_OF_A_KIND = 'THREE_OF_A_KIND',
  FOUR_OF_A_KIND = 'FOUR_OF_A_KIND',
  FULL_HOUSE = 'FULL_HOUSE',
  SMALL_STRAIGHT = 'SMALL_STRAIGHT',
  LARGE_STRAIGHT = 'LARGE_STRAIGHT',
  POKER = 'POKER',
  CHANCE = 'CHANCE'
}

export enum CategoryType {
  NUMBER = 'NUMBER',
  COMBINATION = 'COMBINATION'
}

export const CATEGORY_TYPES: Record<Category, CategoryType> = {
  [Category.ONES]: CategoryType.NUMBER,
  [Category.TWOS]: CategoryType.NUMBER,
  [Category.THREES]: CategoryType.NUMBER,
  [Category.FOURS]: CategoryType.NUMBER,
  [Category.FIVES]: CategoryType.NUMBER,
  [Category.SIXES]: CategoryType.NUMBER,

  [Category.THREE_OF_A_KIND]: CategoryType.COMBINATION,
  [Category.FOUR_OF_A_KIND]: CategoryType.COMBINATION,
  [Category.FULL_HOUSE]: CategoryType.COMBINATION,
  [Category.SMALL_STRAIGHT]: CategoryType.COMBINATION,
  [Category.LARGE_STRAIGHT]: CategoryType.COMBINATION,
  [Category.POKER]: CategoryType.COMBINATION,
  [Category.CHANCE]: CategoryType.COMBINATION
};
