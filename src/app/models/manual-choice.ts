import { Category } from './category';
import { ChoiceAction } from './choice-action';

export interface ManualChoice {
  rollNumber: number;
  category: Category;
  action: ChoiceAction;
}
