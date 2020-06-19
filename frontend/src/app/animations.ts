import { trigger, state, style, transition, group, animate } from '@angular/animations';

export const openClosed = [
    trigger('openClosed', [
        state('open', style({ height: '*' })),
        state('closed', style({ height: 0 })),
        transition('open => closed', [
            style({ height: '*' }),
            group([
                animate('0.7s cubic-bezier(0.165, 0.84, 0.44, 1)', style({ height: 0 }))
            ]),
        ]),
        transition('closed => open', [
            style({ height: 0 }),
            group([
                animate('0.7s cubic-bezier(0.165, 0.84, 0.44, 1)', style({ height: '*' }))
            ])
        ])
    ])
];