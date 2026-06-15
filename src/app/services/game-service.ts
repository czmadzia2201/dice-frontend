import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameState } from '../models/game-state';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'http://localhost:8080/dice';

  constructor(private http: HttpClient) {}

  rollDice(id?: string): Observable<GameState> {
    const url = id
      ? `${this.apiUrl}/${id}/roll`
      : `${this.apiUrl}/roll`;
    return this.http.post<GameState>(url, {});
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

  newGame(): Observable<GameState> {
    return this.http.post<GameState>(
      `${this.apiUrl}/new-game`,
      {}
    );
  }

  optimal(id: string): Observable<GameState> {
    return this.http.post<GameState>(
      `${this.apiUrl}/${id}/optimal`,
      {}
    );
  }

}
