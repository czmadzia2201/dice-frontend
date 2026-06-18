import { Component, inject } from '@angular/core';

import { GameService } from '../../services/game-service';
import { GameState } from '../../models/game-state';
import { Category, CategoryType, CATEGORY_TYPES } from '../../models/category';
import { GamePhase } from '../../models/game-phase';
import { AboutModal } from '../../modals/about-modal/about-modal';
import { ManualChoice } from '../../models/manual-choice';
import { ChoiceAction } from '../../models/choice-action';
import { RollEntry } from '../../models/roll-entry';

@Component({
  selector: 'app-game-page',
  imports: [ AboutModal ],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage {
  private gameService = inject(GameService);

  gameState: GameState | null = null;

  selectedManualCategory?: Category;

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


  rollDice(): void {
    this.gameService.rollDice(this.gameState?.id).subscribe(state => {
      this.gameState = state;
    });
  }

  newGame(): void {
    this.gameService.newGame().subscribe(state => {
      this.gameState = state;
      this.selectedManualCategory = undefined;
    });
  }

  optimal(): void {
    this.gameService.optimal(this.gameState!.id).subscribe(state => {
      this.gameState = state;
    });
  }

  onCategoryClick(category: Category): void {
    if (this.gameState?.gamePhase === 'CHOICE') {
      this.scoreCategory(category);
    }
    if (this.gameState?.gamePhase === 'FINISHED' && this.gameState?.manualAvailableCategories != null) {
      this.selectManualCategory(category);
    }
  }

  scoreCategory(category: Category): void {
    this.gameService.scoreCategory(this.gameState!.id, category).subscribe(state => {
      this.gameState = state;
    });
  }

  selectManualCategory(category: Category): void {
    this.selectedManualCategory =
      this.selectedManualCategory === category ? undefined : category;
  }

  initManual(): void {
    if (this.gameState?.manualResult) {
      return;
    }

    this.gameService.initManual(this.gameState!.id).subscribe(state => {
      this.gameState = state;
    });
  }

  canRoll(): boolean {
    return (this.gameState?.gamePhase ?? GamePhase.ROLL)
        === GamePhase.ROLL;
  }

  canUsePostGameFeatures(): boolean {
    return this.gameState?.gamePhase === GamePhase.FINISHED;
  }

  canChoose(category: Category): boolean {
    return this.canChooseInGame(category) || this.canChooseInManual(category);
  }

  private canChooseInGame(category: Category): boolean {
    return this.gameState?.gamePhase === 'CHOICE'
      && this.isCategoryAvailable(category);
  }

  private canChooseInManual(category: Category): boolean {
    return this.gameState?.manualAvailableCategories != null
      && this.isManualCategoryAvailable(category);
  }

  isCategoryAvailable(category: Category): boolean {
    return this.gameState?.availableCategories.includes(category) ?? true;
  }

  isManualCategoryAvailable(category: Category): boolean {
    return this.gameState?.manualAvailableCategories?.includes(category) ?? true;
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

  getManualHistoryEntry(rowNumber: number) {
    return this.gameState?.manualResult?.rollHistory?.[rowNumber - 1];
  }

  isManualMode(): boolean {
    return this.gameState?.manualResult != null;
  }

  assignManualCategory(rollNumber: number): void {
    if (!this.selectedManualCategory) {
      return;
    }

    const manualChoice: ManualChoice = {
      rollNumber,
      action: ChoiceAction.ASSIGN,
      category: this.selectedManualCategory
    };

    this.gameService.manual(this.gameState!.id, manualChoice).subscribe(state => {
      this.gameState = state;
      this.selectedManualCategory = undefined;
    });
  }

  clearManualCategory(rollNumber: number): void {
    const manualEntry = this.getManualHistoryEntry(rollNumber);

    if (!manualEntry?.category) {
      return;
    }

    const manualChoice: ManualChoice = {
      rollNumber,
      action: ChoiceAction.CLEAR,
      category: manualEntry.category
    };

    this.gameService.manual(this.gameState!.id, manualChoice).subscribe(state => {
      this.gameState = state;
    });
  }

  formatRollEntry(entry: RollEntry | undefined | null): string {
    if (entry?.category == null || entry.score == null) {
      return '- (-)';
    }

    return `${entry.score} (${this.categoryLabels[entry.category]})`;
  }

}
