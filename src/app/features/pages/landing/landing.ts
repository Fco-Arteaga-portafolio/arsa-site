import { Component } from '@angular/core';
import { Hero } from './sections/hero/hero';
import { Services } from './sections/services/services';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [Hero, Services],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {}
