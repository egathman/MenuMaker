import { Component, OnInit, signal, inject  } from '@angular/core';
import { MenuItem } from '../menu-item/menu-item';
import {MatButtonModule} from '@angular/material/button';
import {DataFetcher, CookBookRecipe} from '../services/data-fetcher/data-fetcher'
import { RecipeEditor } from '../recipe-editor/recipe-editor';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'recipes',
  imports: [MenuItem, MatButtonModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes implements OnInit {
  availableRecipes = signal<CookBookRecipe[]>([]); 
  readonly dialog = inject(MatDialog)

  constructor (private dataServer: DataFetcher){}

  ngOnInit(): void {
    this.dataServer.getCookbook().subscribe((cookBook) =>{      
      this.availableRecipes.set(cookBook.Recipes as CookBookRecipe[])
    });
  }

  openNewRecipe(): void {
    // Empty Default Recipe
    let newCBRecipe: CookBookRecipe = {
      ID: 0,
      recipe: {
        RecipeName: "",
        Ingrediants: []
      }
    };
    const dialogRef = this.dialog.open(RecipeEditor, {
      data: {
        recipe: newCBRecipe,
        newRecipe: true
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataServer.getCookbook().subscribe((cookBook) =>{      
        this.availableRecipes.set(cookBook.Recipes as CookBookRecipe[])
      });
    });
  }
}

