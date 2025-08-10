// src/app/components/logo-animated/logo-animated.component.ts
import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import gsap from 'gsap'; // Importa GSAP

@Component({
  selector: 'app-logo-animated', // Este selector es el que usarás en otras partes de tu app
  templateUrl: './logo-animated.html',
  styleUrls: ['./logo-animated.css']
})
export class LogoAnimated implements AfterViewInit {
  // @ViewChildren nos permite obtener una QueryList de todos los elementos con la referencia #logoPath
  @ViewChildren('logoPath') paths!: QueryList<ElementRef<SVGPathElement>>;

  constructor() { }

  ngAfterViewInit(): void {
    // Esperar un poco más para asegurar que el DOM esté completamente renderizado
    setTimeout(() => {
      this.initAnimation();
    }, 200);
  }

  private initAnimation(): void {
    console.log('Iniciando animación del logo...');
    
    // Asegúrate de que los paths se hayan renderizado en el DOM antes de intentar animarlos
    if (this.paths.length === 0) {
      console.error('No SVG paths found for animation. Make sure #logoPath is added to each path in HTML.');
      return;
    }

    console.log(`Encontrados ${this.paths.length} paths para animar`);

    const masterTimeline = gsap.timeline({ 
      defaults: { ease: 'power2.out' },
      repeat: 0 // No repetir la animación
    });
    
    const drawDuration = 1.5;      // Duración reducida para un dibujo más fluido
    const letterGap = 0.2;         // Retraso reducido entre letras para mejor continuidad
    const fillDuration = 0.8;      // Duración aumentada para el relleno
    const fillDelayOffset = 0.3;   // Retraso reducido para que el relleno empiece más pronto

    // Convertir la QueryList a un array para poder usar forEach y acceder por índice
    const pathElements = this.paths.toArray();

    // Agregar etiqueta de inicio
    masterTimeline.addLabel('startDraw', 0);

    pathElements.forEach((pathRef, index) => {
      const path = pathRef.nativeElement; // El elemento <path> nativo del DOM
      const length = path.getTotalLength(); // Obtiene la longitud exacta del trazo

      console.log(`Path ${index + 1}: longitud = ${length}`);

      // Configuración inicial usando técnica alternativa
      // Usar stroke-dasharray dinámico para un control más preciso
      gsap.set(path, {
        strokeDasharray: `0 ${length}`,
        strokeDashoffset: 0,
        fill: 'none',
        strokeOpacity: 1,
        visibility: 'visible'
      });

      // Aplicar una configuración adicional para asegurar que no haya artefactos
      // Forzar un reflow del DOM para asegurar que los estilos se apliquen correctamente
      path.getBoundingClientRect();

      // Verificar que los estilos se aplicaron correctamente
      console.log(`Path ${index + 1}: strokeDasharray = ${path.style.strokeDasharray}, strokeDashoffset = ${path.style.strokeDashoffset}`);
      console.log(`Path ${index + 1}: getTotalLength() = ${path.getTotalLength()}, strokeDasharray actual = ${path.style.strokeDasharray}`);

      // 2. Añadir la animación de dibujo del contorno usando stroke-dasharray dinámico
      masterTimeline.to(path, {
        strokeDasharray: `${length} 0`,  // Anima de "0 length" a "length 0" para dibujar progresivamente
        duration: drawDuration,
        ease: 'none'              // Easing lineal para un dibujo más consistente
      }, `startDraw+=${index * letterGap}`); // Usa la etiqueta para posicionar cada letra secuencialmente

      // 3. Añadir la animación de relleno a la línea de tiempo maestra
      // El relleno empieza mucho después del dibujo de la letra para que el trazo sea visible
      masterTimeline.to(path, {
        fill: '#64FFDA',          // Cambia el relleno al color turquesa
        duration: fillDuration,
        ease: 'power2.in'         // Un easing para la aparición del relleno
      }, `startDraw+=${index * letterGap + drawDuration + fillDelayOffset}`); // Posiciona el inicio del relleno mucho después
    });

    // Iniciar la animación automáticamente
    console.log('Reproduciendo animación...');
    masterTimeline.play();
    
    // Agregar callback para confirmar que la animación se completó
    masterTimeline.eventCallback('onComplete', () => {
      console.log('Animación del logo completada');
    });
  }
}