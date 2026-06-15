import { Category } from './category';
import { RollEntry } from './roll-entry';
import { GamePhase } from './game-phase';
import { OptimalResult } from './optimal-result';

export interface GameState {
    id: string;
    createdAt: string;
    currentRoll: number[];
    availableCategories: Category[];
    score: number | null;
    totalScore: number | null ;
    rollHistory: RollEntry[];
    gamePhase: GamePhase;
    optimalResult: OptimalResult | null;
}
