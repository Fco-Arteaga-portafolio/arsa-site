import { Component } from '@angular/core';
import { Hero } from '../landing/sections/hero/hero';
import { Services } from '../landing/sections/services/services';

@Component({
  selector: 'app-enterprise',
  standalone: true,
  imports: [Hero, Services],
  templateUrl: './enterprise.html',
  styleUrl: './enterprise.scss',
})
export class Enterprise {}
