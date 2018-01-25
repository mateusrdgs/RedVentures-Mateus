import { animate, keyframes, state, style, transition, trigger, query, stagger } from '@angular/animations';

export const hotelAnimation = [
  trigger('enterIn', [
    state('*', style({
      transform: 'translateX(-2rem)',
      opacity: 0
    })),
    state('entered', style({
      transform: 'translateX(0)',
      opacity: 1
    })),
    transition('* <=> entered', animate('.4s linear'))
  ])
];
