import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [NgFor],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.css'
})
export class ContactSection {
  contactContent = {
    title: 'Contáctanos',
    subtitle: 'Estamos aquí para ayudarte a hacer realidad tu proyecto',
    description: '¿Tienes una idea en mente? ¡Conversemos sobre cómo podemos ayudarte a convertirla en realidad!',
    contactInfo: [
      {
        icon: '📧',
        title: 'Email',
        value: 'hola@tuempresa.com',
        link: 'mailto:hola@tuempresa.com'
      },
      {
        icon: '📱',
        title: 'Teléfono',
        value: '+1 (555) 123-4567',
        link: 'tel:+15551234567'
      },
      {
        icon: '📍',
        title: 'Ubicación',
        value: 'Ciudad, País',
        link: '#'
      }
    ]
  };
} 