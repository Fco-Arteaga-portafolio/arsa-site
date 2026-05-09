import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {}
