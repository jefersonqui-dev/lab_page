import { Component } from '@angular/core';
import { HeroSection } from "./features/home/components/hero-section/hero-section";
import { Header } from "./shared/components/header/header";
import { AboutSection } from "./features/home/components/about-section/about-section";
import { ServicesSection } from "./features/home/components/services-section/services-section";
import { ContactSection } from "./features/home/components/contact-section/contact-section";
import { DividierDiagonal } from "./shared/components/dividier-diagonal/dividier-diagonal";

@Component({
  selector: 'app-root',
  imports: [Header, HeroSection, AboutSection, ServicesSection, ContactSection, DividierDiagonal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'lab01-frontend';
}
