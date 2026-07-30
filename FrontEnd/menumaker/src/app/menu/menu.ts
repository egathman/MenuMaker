import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { MenuItem } from '../menu-item/menu-item';

@Component({
  selector: 'menu',
  imports: [MatIconModule, MatDividerModule, MatButtonModule, MatListModule, MenuItem],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {}
