import { Component, output } from '@angular/core';

@Component({
  selector: 'app-about-modal',
  imports: [],
  templateUrl: './about-modal.html',
  styleUrl: './about-modal.css',
})
export class AboutModal {

  close = output<void>();

}
