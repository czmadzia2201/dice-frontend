import { Category } from './category';

export interface RollEntry {
  rollNumber: number;
  diceValues: number[];
  category: Category | null;
  score: number | null;
}
