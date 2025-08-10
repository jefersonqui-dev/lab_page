import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { DividierDiagonal } from '../../../../shared/components/dividier-diagonal/dividier-diagonal';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, NgFor,DividierDiagonal],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css'
})
export class HeroSection implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild('animatedTitle') animatedTitleRef!: ElementRef;
  
  // Propiedades configurables para el separador
  separatorConfig = {
    width: '0.8cm',
    color: '#64ffda', // 6 dígitos, sin canal alfa
    borderColor: '#64ffda', // 6 dígitos, sin canal alfa
    lineWidth: '0.5px',
    patternSize: '10px',
    orientation: 'vertical' as 'vertical' | 'horizontal'
  };

  // Contenido del hero
  heroContent = {
    title: 'KAMAY J',
    subtitle: 'Dejate Sorprender con Nuestro Diseños',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quasi.'
  };

  // --- Propiedades para el efecto de animación ---
  private solveMilliseconds = 60;
  private characterSelectionMilliseconds = 20;
  private delayMilliseconds = 100;
  private curtainDelayMilliseconds = 50;
  private characters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890*#@/*!%&^"];
  private wordsToRotate = ["BIENVENIDOS", "PLATAFORMA", "DISEÑO", "KAMAY"];
  private currentWordIndex = 0;
  private intervalId: any;
  private isAnimating = false;

  // Carrusel de imágenes
  carouselImages = [
    {
      id: 1,
      src: 'assets/images/logo/ref1.png',
      alt: 'Proyecto 1',
      title: 'Diseño Web Moderno'
    },
    {
      id: 2,
      src: 'assets/images/logo/ref2.png',
      alt: 'Proyecto 2',
      title: 'Aplicación Móvil'
    },
    {
      id: 3,
      src: 'assets/images/logo/logoColectivo.png',
      alt: 'Proyecto 3',
      title: 'Branding Creativo'
    }
  ];

  currentSlide = 0;

  constructor() { }

  ngOnInit(): void {
    // Puedes dejar esto vacío o inicializar algo que no dependa del DOM
  }

  // ngAfterViewInit se ejecuta después de que la vista del componente ha sido inicializada
  ngAfterViewInit(): void {
    if (this.animatedTitleRef) {
      this.startRotatingText(this.animatedTitleRef.nativeElement);
    }
  }

  // ngOnDestroy se ejecuta cuando el componente se destruye
  // Es crucial para limpiar los intervalos y evitar fugas de memoria
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // --- Métodos del efecto de animación ---
  private randomArrayElement(arr: string[]): string {
    return arr[(arr.length * Math.random()) | 0];
  }

  private replaceCharacter(str: string, index: number, chr: string): string {
    if (index < 0 || index >= str.length) {
      return str; // Manejo de caso borde
    }
    return `${str.substring(0, index)}${chr}${str.substring(index + 1)}`;
  }

  private startRotatingText(element: HTMLElement): void {
    // Iniciar la primera animación inmediatamente
    this.scrambleText(element);

    // Calcular el tiempo total de animación
    const totalAnimationTime = 3000; // 3 segundos por palabra

    // Configurar el intervalo para la siguiente animación
    this.intervalId = setInterval(() => {
      if (!this.isAnimating) {
        this.scrambleText(element);
      }
    }, totalAnimationTime);
  }

  private scrambleText(element: HTMLElement): void {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    
    const nextWord = this.wordsToRotate[this.currentWordIndex];
    this.currentWordIndex = (this.currentWordIndex + 1) % this.wordsToRotate.length;
    
    const elementCharacters = [...nextWord];
    const totalDuration = elementCharacters.length * this.delayMilliseconds + this.solveMilliseconds;
    
    // Agregar clase activa
    element.classList.add("active");
    
    // Inicializar con caracteres aleatorios
    element.innerText = elementCharacters.map(() => this.randomArrayElement(this.characters)).join('');
    
    // Animar cada carácter
    elementCharacters.forEach((char, index) => {
      setTimeout(() => {
        // Efecto de scramble antes de revelar
        let scrambleCount = 0;
        const scrambleInterval = setInterval(() => {
          element.innerText = this.replaceCharacter(
            element.innerText,
            index,
            this.randomArrayElement(this.characters)
          );
          scrambleCount++;
          
          if (scrambleCount >= 3) {
            clearInterval(scrambleInterval);
            element.innerText = this.replaceCharacter(
              element.innerText,
              index,
              char
            );
          }
        }, this.characterSelectionMilliseconds);
      }, index * this.delayMilliseconds);
    });
    
    // Remover clase activa y resetear estado
    setTimeout(() => {
      element.classList.remove("active");
      this.isAnimating = false;
    }, totalDuration);
  }

  // Métodos para el carrusel
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 
      ? this.carouselImages.length - 1 
      : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
