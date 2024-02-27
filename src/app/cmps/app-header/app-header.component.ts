import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {

  isMobile = window.innerWidth <= 500
  isMobileNavOpen = false

  toggleMobileNav() {
    this.isMobileNavOpen = !this.isMobileNavOpen
  }
}
