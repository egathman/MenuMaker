import { Component, OnInit, signal  } from '@angular/core';
import { MenuItem } from '../menu-item/menu-item';
import {MatButtonModule} from '@angular/material/button';
import {DataFetcher, CookBookRecipe} from '../services/data-fetcher/data-fetcher'
@Component({
  selector: 'recipes',
  imports: [MenuItem, MatButtonModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes implements OnInit {
  availableRecipes = signal<CookBookRecipe[]>([]); 

  constructor (private dataServer: DataFetcher){}

  ngOnInit(): void {
    this.dataServer.getCookbook().subscribe((cookBook) =>{      
      this.availableRecipes.set(cookBook.Recipes as CookBookRecipe[])
    });
  }
}

