import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Menu } from './menu/menu';
import { Recipes } from './recipes/recipes';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

enum eMainViewOption {
  Menu,    // 0
  Recipes,  // 1
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    MatSidenavModule, MatTabsModule, Menu, Recipes,
  MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('menumaker');

  private displayView = eMainViewOption.Menu;

  public setMenuView() {
    this.SetDisplay(eMainViewOption.Menu);
  }

  public setRecipesView() {
    this.SetDisplay(eMainViewOption.Recipes);
  }

  private SetDisplay(display : eMainViewOption) {
    this.displayView = display; 
  }

  public isMenu() : boolean {
    return this.displayView === eMainViewOption.Menu;
  }

  public isRecipe() : boolean {
    return this.displayView === eMainViewOption.Recipes;
  }

}
