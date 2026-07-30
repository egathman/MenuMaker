import { Service } from '@angular/core';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define an interface to enforce type safety for the API response
export interface Recipe {
    RecipeName: string,
    Ingrediants: Array<string>
}

export interface CookBookRecipe {
    ID: number,
    recipe: Recipe
}

export interface Cookbook {
  Recipes: Array<CookBookRecipe>
}

@Injectable({
  providedIn: 'root'
})
export class DataFetcher {
    // Public placeholder API for testing
  private apiUrl = '/api/Recipes';

  // Inject HttpClient through the constructor
  constructor(private http: HttpClient) {}

  // Return an Observable of type User array
  getCookbook(): Observable<Cookbook> {
    return this.http.get<Cookbook>(this.apiUrl);
  }
}
