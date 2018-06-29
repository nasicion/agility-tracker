import { Component } from '@angular/core';
import { timer } from 'rxjs'; // (for rxjs < 6) use 'rxjs/observable/timer'
import { trigger, state, style, animate, transition } from '@angular/animations';

export abstract class AbstractBaseFormComponent {
  alert : IAlert;
  buttonDisabled : boolean = false;

  showAlert(message: string, type: string) {
    this.alert = {
      "message": message,
      "type":  type,
      "state": true
    }
    timer(3000).subscribe(val => {
      this.alert = undefined;
    });
  }

  closeAlert(alert: IAlert) {
    this.alert = undefined;
  }

  inputChanged($event) {
    this.buttonDisabled = false;
  }

}

export const alertAnimation =
  trigger('alertState', [
    state('true', style({transform: 'translateX(0)'})),
    transition('void => *', [
     style({transform: 'translateX(100%)'}),
     animate(500)
   ]),
   transition('* => void', [
     animate(500, style({transform: 'translateX(100%)'}))
   ])
  ]);

export interface IAlert {
  type: string;
  message: string;
  state: boolean;
}
