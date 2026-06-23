import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-privacidad',
  standalone: true,
  imports: [],
  templateUrl: './privacidad.html',
  styleUrl: './privacidad.css',
})
export class Privacidad {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
