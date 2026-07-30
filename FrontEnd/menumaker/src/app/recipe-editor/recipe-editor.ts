import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormArray, NonNullableFormBuilder,  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import {MatListModule} from '@angular/material/list';
import { CookBookRecipe, Recipe } from '../services/data-fetcher/data-fetcher';
import { FormField } from "@angular/forms/signals";

@Component({
  selector: 'app-recipe-editor',
  imports: [MatDialogTitle, MatListModule, ReactiveFormsModule, FormField],
  templateUrl: './recipe-editor.html',
  styleUrl: './recipe-editor.css',
})
export class RecipeEditor implements OnInit {
  readonly dialogRef = inject(MatDialogRef<RecipeEditor>);
  data = inject<{recipe: CookBookRecipe}>(MAT_DIALOG_DATA);
    private fb = inject(NonNullableFormBuilder);

  profileForm = this.fb.group({
    RecipeName: ['', Validators.required ], // Tracks hidden or system fields safely
    Ingrediants: this.fb.array([
      this.fb.control('')
    ])
  });

  ngOnInit(): void {
    this.profileForm.setValue(this.data.recipe.recipe)
  }

  onNoClick() {
    this.dialogRef.close()
  }

  getRecipeName(): string {
    return this.data.recipe.recipe.RecipeName;
  }

  onSubmit(): void {

  }
}
