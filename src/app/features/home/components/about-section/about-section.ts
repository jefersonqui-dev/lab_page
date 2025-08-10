import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface AboutContent {
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
}

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [NgFor],
  templateUrl: './about-section.html',
  styleUrl: './about-section.css'
})
export class AboutSection {
  aboutContent: AboutContent = {
    title: 'Acerca de Nosotros',
    subtitle: 'Innovación y calidad en cada proyecto',
    description: 'Somos un equipo apasionado por crear experiencias digitales excepcionales. Nuestra misión es transformar ideas en realidades digitales impactantes.',
    features: [
      {
        icon: '🚀',
        title: 'Innovación',
        description: 'Siempre a la vanguardia de las últimas tecnologías'
      },
      {
        icon: '💡',
        title: 'Creatividad',
        description: 'Soluciones únicas y creativas para cada desafío'
      },
      {
        icon: '⚡',
        title: 'Rendimiento',
        description: 'Optimización máxima para la mejor experiencia de usuario'
      }
    ]
  };
} 