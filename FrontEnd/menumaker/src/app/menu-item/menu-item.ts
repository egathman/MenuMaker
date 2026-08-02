import { Component, input, inject, linkedSignal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { CookBookRecipe, Recipe } from '../services/data-fetcher/data-fetcher';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { RecipeEditor } from '../recipe-editor/recipe-editor';

@Component({
  selector: 'menu-item',
  imports: [MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.css',
})
export class MenuItem {
    Day = input<string>('Sunday');
    EditMode = input<boolean>(false)
    Recipe = input<CookBookRecipe>()
    DisplayRecipe = linkedSignal(() => this.Recipe());
    readonly dialog = inject(MatDialog)

    public getIngrediants() : Array<string>{
      return this.DisplayRecipe()?.recipe.Ingrediants!
    }

    public getRecipeName() : string {
      return this.DisplayRecipe()?.recipe.RecipeName!;
    }

    public openRecipeEditor() {
      const dialogRef = this.dialog.open(RecipeEditor, {
        data: {
          recipe: this.DisplayRecipe(),
          newRecipe: false
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        let newRecipe: CookBookRecipe = result;
        this.DisplayRecipe.set(newRecipe);
        console.log('The dialog was closed');
      });
    }
}
