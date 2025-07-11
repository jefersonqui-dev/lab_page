import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-dividier-diagonal',
  templateUrl: './dividier-diagonal.html',
  styleUrl: './dividier-diagonal.css',
  standalone: true,
  imports: [NgStyle]
})
export class DividierDiagonal {
  @Input() width: string = '0.8cm';
  @Input() color: string = '#64ffda';
  @Input() borderColor: string = '#64ffda';
  @Input() lineWidth: string = '0.5px';
  @Input() patternSize: string = '10px';
  @Input() orientation: 'vertical' | 'horizontal' | string = 'vertical';
  @Input() opacity: number = 0.44; // valor por defecto (0.44 ≈ 70 en hex)

  get style() {
    let direction: string;
    if (this.orientation === 'vertical') {
      direction = '315deg';
    } else if (this.orientation === 'horizontal') {
      direction = '45deg';
    } else {
      direction = this.orientation; // permite ángulos personalizados
    }
    const colorWithOpacity = this.hexToRgba(this.color, this.opacity);
    const borderColorWithOpacity = this.hexToRgba(this.borderColor, this.opacity);

    return {
      height: '100%',
      width: this.width,
      borderLeft: `${this.lineWidth} solid ${borderColorWithOpacity}`,
      borderRight: `${this.lineWidth} solid ${borderColorWithOpacity}`,
      backgroundImage: `repeating-linear-gradient(${direction}, ${colorWithOpacity} 0, ${colorWithOpacity} ${this.lineWidth}, transparent 0, transparent 50%)`,
      backgroundSize: `${this.patternSize} ${this.patternSize}`,
      backgroundAttachment: 'local',
      display: 'block',
      margin: '0 auto',
    };
  }

  // Utilidad para convertir hex a rgba
  hexToRgba(hex: string, opacity: number) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r},${g},${b},${opacity})`;
  }
}
