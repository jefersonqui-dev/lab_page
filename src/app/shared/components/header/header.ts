import { Component, HostListener, ElementRef } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  // Estado del menú desplegable de Product
  isProductMenuOpen = false;
  
  // Estado del menú móvil
  isMobileMenuOpen = false;

  navItems = [
    { label: 'Inicio', numberColor: 'text-[#64ffda]' },
    { label: 'Catálogo', numberColor: 'text-[#64ffda]' },
    { label: 'Galeria', numberColor: 'text-[#64ffda]' },
    { label: 'Sobre Nosotros', numberColor: 'text-[#64ffda]' }
  ];

  constructor(private elementRef: ElementRef) {}

  // Alternar el menú desplegable de Product
  toggleProductMenu() {
    this.isProductMenuOpen = !this.isProductMenuOpen;
  }

  // Cerrar el menú desplegable de Product
  closeProductMenu() {
    this.isProductMenuOpen = false;
  }

  // Alternar el menú móvil
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Cerrar el menú móvil
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  // Escuchar clics en el documento para cerrar menús cuando se hace clic fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Verificar si el clic fue fuera del componente header
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeProductMenu();
      this.closeMobileMenu();
    }
  }

  // Escuchar la tecla Escape para cerrar menús
  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.closeProductMenu();
    this.closeMobileMenu();
  }
}
