import { Category } from './category';
import { RollEntry } from './roll-entry';
import { GamePhase } from './game-phase';
import { ResultSummary } from './result-summary';

export interface GameState {
    id: string;
    createdAt: string;
    currentRoll: number[];
    availableCategories: Category[];
    manualAvailableCategories: Category[] | null;
    score: number | null;
    totalScore: number | null ;
    rollHistory: RollEntry[];
    gamePhase: GamePhase;
    optimalResult: ResultSummary | null;
    manualResult: ResultSummary | null;
}
