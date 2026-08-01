import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { RecipeEditor } from './recipe-editor';

describe('RecipeEditor', () => {
  let component: RecipeEditor;
  let fixture: ComponentFixture<RecipeEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeEditor],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: () => undefined },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            recipe: {
              ID: 1,
              recipe: {
                RecipeName: 'Test Recipe',
                Ingrediants: ['Flour', 'Eggs'],
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
