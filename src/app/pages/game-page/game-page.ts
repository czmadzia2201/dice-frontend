import { Component, inject } from '@angular/core';

import { GameService } from '../../services/game-service';
import { GameState } from '../../models/game-state';
import { Category, CategoryType, CATEGORY_TYPES } from '../../models/category';
import { GamePhase } from '../../models/game-phase';
import { AboutModal } from '../../modals/about-modal/about-modal';

@Component({
  selector: 'app-game-page',
  imports: [ AboutModal ],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage {
  private gameService = inject(GameService);

  gameState: GameState | null = null;

  showAbout = false;

  readonly allCategories = Object.values(Category);

  readonly numberCategories = this.allCategories.filter(
    category => CATEGORY_TYPES[category] === CategoryType.NUMBER
  );

  readonly combinationCategories = this.allCategories.filter(
    category => CATEGORY_TYPES[category] === CategoryType.COMBINATION
  );

  readonly categoryLabels: Record<Category, string> = {
    [Category.ONES]: 'Ones',
    [Category.TWOS]: 'Twos',
    [Category.THREES]: 'Threes',
    [Category.FOURS]: 'Fours',
    [Category.FIVES]: 'Fives',
    [Category.SIXES]: 'Sixes',
    [Category.THREE_OF_A_KIND]: 'Three of a Kind',
    [Category.FOUR_OF_A_KIND]: 'Four of a Kind',
    [Category.FULL_HOUSE]: 'Full House',
    [Category.SMALL_STRAIGHT]: 'Small Straight',
    [Category.LARGE_STRAIGHT]: 'Large Straight',
    [Category.POKER]: 'Poker',
    [Category.CHANCE]: 'Chance'
  };

  readonly phaseLabels: Record<GamePhase, string> = {
    [GamePhase.ROLL]: 'Roll the dice',
    [GamePhase.CHOICE]: 'Choose a category',
    [GamePhase.FINISHED]: 'Game finished'
  };

  readonly rowNumbers = Array.from({ length: 13 }, (_, index) => index + 1);

  readonly emptyDice = Array.from({ length: 5 });


  isCategoryAvailable(category: Category): boolean {
    return this.gameState?.availableCategories.includes(category) ?? true;
  }

  rollDice(): void {
    this.gameService.rollDice(this.gameState?.id).subscribe(state => {
      this.gameState = state;
    });
  }

  newGame(): void {
    this.gameService.newGame().subscribe(state => {
      this.gameState = state;
    });
  }

  optimal(): void {
    this.gameService.optimal(this.gameState!.id).subscribe(state => {
      this.gameState = state;
    });
  }

  scoreCategory(category: Category): void {
    this.gameService.scoreCategory(this.gameState!.id, category).subscribe(state => {
      this.gameState = state;
    });
  }

  canRoll(): boolean {
    return (this.gameState?.gamePhase ?? GamePhase.ROLL)
        === GamePhase.ROLL;
  }

  canGetOptimal(): boolean {
    return this.gameState?.gamePhase === GamePhase.FINISHED;
  }

  canChoose(category: Category): boolean {
    return this.gameState?.gamePhase === 'CHOICE' && this.isCategoryAvailable(category);
  }

  gamePhase(): string {
    return this.phaseLabels[
      this.gameState?.gamePhase ?? GamePhase.ROLL
    ];
  }

  getHistoryEntry(rowNumber: number) {
    return this.gameState?.rollHistory?.[rowNumber - 1];
  }

  getOptimalHistoryEntry(rowNumber: number) {
    return this.gameState?.optimalResult?.rollHistory?.[rowNumber - 1];
  }

}
