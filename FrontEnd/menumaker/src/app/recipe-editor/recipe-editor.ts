import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormArray,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataFetcher, CookBookRecipe, Recipe } from '../services/data-fetcher/data-fetcher';

@Component({
  selector: 'app-recipe-editor',
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-editor.html',
  styleUrl: './recipe-editor.css',
})
export class RecipeEditor implements OnInit {
  readonly dialogRef = inject(MatDialogRef<RecipeEditor>);
  data = inject<{ recipe: CookBookRecipe }>(MAT_DIALOG_DATA);
  private fb = inject(NonNullableFormBuilder);

  isEditingName = false;

  newIngredient = this.fb.control('');

  profileForm = this.fb.group({
    RecipeName: this.fb.control('', Validators.required),
    Ingrediants: this.fb.array<FormControl<string>>([]),
  });

  get ingredientsArray(): FormArray<FormControl<string>> {
    return this.profileForm.controls.Ingrediants as FormArray<FormControl<string>>;
  }

  constructor (private dataServer: DataFetcher){}

  ngOnInit(): void {
    const recipe = this.data.recipe.recipe;
    this.profileForm.patchValue({
      RecipeName: recipe.RecipeName,
    });

    this.ingredientsArray.clear();
    recipe.Ingrediants.forEach((ingredient) => {
      this.ingredientsArray.push(this.fb.control(ingredient));
    });
  }

  toggleNameEdit(): void {
    this.isEditingName = !this.isEditingName;
  }

  addIngredient(): void {
    const ingredient = this.newIngredient.value?.trim();

    if (!ingredient) {
      return;
    }

    this.ingredientsArray.push(this.fb.control(ingredient));
    this.newIngredient.reset('');
  }

  removeIngredient(index: number): void {
    this.ingredientsArray.removeAt(index);
  }

  getIngredients(): string[] {
    return this.ingredientsArray.controls.map((control) => control.value);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  getRecipeName(): string {
    return this.data.recipe.recipe.RecipeName;
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      var formData: Recipe = this.profileForm.getRawValue();
      let CBRecipe: CookBookRecipe = {
        ID: this.data.recipe.ID,
        recipe: formData
      };
      this.dataServer.saveRecipe(CBRecipe).subscribe({
        next: (response) => {
          this.dialogRef.close();
        },
        error: (error) => {
          // Non-2xx codes fall into this block automatically
          // Make it obvious there is a form error
        }
      });
    }
  }
}
