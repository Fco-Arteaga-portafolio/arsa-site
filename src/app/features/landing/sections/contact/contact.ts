import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  @Output()
  openDiagnostic = new EventEmitter<void>();
}
