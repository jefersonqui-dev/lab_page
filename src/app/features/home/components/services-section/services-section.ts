import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [NgFor],
  templateUrl: './services-section.html',
  styleUrl: './services-section.css'
})
export class ServicesSection {
  servicesContent = {
    title: 'Nuestros Servicios',
    subtitle: 'Soluciones integrales para tu negocio digital',
    services: [
      {
        icon: '🎨',
        title: 'Diseño Web',
        description: 'Creación de sitios web modernos y responsivos con las mejores prácticas de UX/UI',
        features: ['Diseño responsivo', 'Optimización SEO', 'Integración CMS']
      },
      {
        icon: '📱',
        title: 'Desarrollo Móvil',
        description: 'Aplicaciones móviles nativas y multiplataforma para iOS y Android',
        features: ['Apps nativas', 'React Native', 'Flutter']
      },
      {
        icon: '⚙️',
        title: 'Desarrollo Backend',
        description: 'APIs robustas y escalables para potenciar tus aplicaciones',
        features: ['REST APIs', 'GraphQL', 'Microservicios']
      }
    ]
  };
} 