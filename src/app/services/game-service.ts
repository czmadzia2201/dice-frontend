import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameState } from '../models/game-state';
import { Category } from '../models/category';
import { ManualChoice } from '../models/manual-choice';
import { RollMode } from '../models/roll-mode';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'http://localhost:8080/dice/api';

  constructor(private http: HttpClient) {}

  rollDice(id: string, diceToRoll: boolean[]): Observable<GameState> {
    return this.http.post<GameState>(`${this.apiUrl}/${id}/roll`,
      JSON.stringify(diceToRoll),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  newGameAndRollDice(rollMode: RollMode): Observable<GameState> {
    return this.http.post<GameState>(`${this.apiUrl}/roll`,
      JSON.stringify(rollMode),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  scoreCategory(id: string, category: Category): Observable<GameState> {
    return this.http.post<GameState>(
      `${this.apiUrl}/${id}/score`,
      JSON.stringify(category),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  newGame(rollMode: RollMode): Observable<GameState> {
    return this.http.post<GameState>(
      `${this.apiUrl}/new-game`,
      JSON.stringify(rollMode),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  optimal(id: string): Observable<GameState> {
    return this.http.post<GameState>(
      `${this.apiUrl}/${id}/optimal`,
      {}
    );
  }

  manual(id: string, manualChoice: ManualChoice): Observable<GameState> {
    return this.http.post<GameState>(
      `${this.apiUrl}/${id}/manual`,
      manualChoice
    );
  }

  initManual(id: string): Observable<GameState> {
    return this.http.post<GameState>(
      `${this.apiUrl}/${id}/init-manual`,
      {}
    );
  }

}
