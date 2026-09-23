import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ifrat-emite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ifrat-emite.html',
  styleUrl: './ifrat-emite.css',
})
export class IfratEmiteComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {
    // AOS animations initialization if needed
    this.scrollToTop();
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  goBack(): void {
    this.location.back();
  }

  navigateTo(url: string): void {
    window.location.href = url;
  }
}
