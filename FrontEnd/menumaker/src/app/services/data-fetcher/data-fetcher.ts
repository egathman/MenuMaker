import { Service } from '@angular/core';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
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

  // this.articleService.createArticleWithResponse(payload).subscribe({
  //     next: (response) => {
  //       // Read the numeric status code (e.g., 201)
  //       console.log('HTTP Status Code:', response.status); 
        
  //       // Read the status text status (e.g., "Created")
  //       console.log('HTTP Status Text:', response.statusText); 
        
  //       // The actual body data is moved to the .body property
  //       console.log('Response Body:', response.body); 
  //     },
  //     error: (error) => {
  //       // Non-2xx codes fall into this block automatically
  //       // You can still read the status of an error response
  //       console.error('Error Status Code:', error.status);
  //     }
  //   });
  saveRecipe(recipe: CookBookRecipe): Observable<HttpResponse<void>> {

    const queryParams = new HttpParams()
      .set('id', recipe.ID);

    return this.http.put<void>(this.apiUrl, recipe.recipe, {
      observe: 'response',
      params: queryParams
    });   
  }

  addRecipe(recipe: CookBookRecipe): Observable<HttpResponse<void>> {
    return this.http.post<void>(this.apiUrl, recipe.recipe, {
      observe: 'response'
    });
  }
}
