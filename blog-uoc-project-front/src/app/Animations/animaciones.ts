import {
  animate,
  animateChild,
  group,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const SlideInOutAnimation = [
  trigger('animation', [
    transition(':enter', [
      query('mat-card', [
        style({opacity: 0, transform: 'translateY(-50px)'}),
        stagger(30, [
          animate('1000ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'none' }))
        ])
      ], {limit: 1})
    ])
  ]),
];


export const SlideInOutAnimation2 = [
  trigger('animation', [
    state(
      'waiting',
      style({
        opacity: 0.1,
      })
    ),
    state(
      'loaded',
      style({
        opacity: 1,
      })
    ),
    transition('waiting => loaded', [style({ height: 0 }), animate(2000)]),
  ]),
];

export const ChargeAnimation = [
  trigger('animation', [
    state(
      'void',
      style({
        opacity: 0.1,
      })
    ),
    transition('void <=> *', animate(2000)),
  ]),
];

export const slideInAnimation = [
  trigger('routeAnimations', [
    transition('HomePage <=> AboutPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ]),
      query(':enter', [style({ left: '-100%' })]),
      query(':leave', animateChild()),
      group([
        query(':leave', [animate('3000ms ease-out', style({ left: '100%' }))]),
        query(':enter', [animate('3000ms ease-out', style({ left: '0%' }))]),
      ]),
      query(':enter', animateChild()),
    ]),
    transition('* <=> FilterPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ]),
      query(':enter', [style({ left: '-100%' })]),
      query(':leave', animateChild()),
      group([
        query(':leave', [animate('2000ms ease-out', style({ left: '100%' }))]),
        query(':enter', [animate('3000ms ease-out', style({ left: '0%' }))]),
      ]),
      query(':enter', animateChild()),
    ]),
  ]),
];
