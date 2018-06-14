import { timer } from 'rxjs'; // (for rxjs < 6) use 'rxjs/observable/timer'



export abstract class AbstractBaseFormComponent {
  alert: IAlert;
  buttonDisabled: boolean;


  showAlert(message: string, type: string) {
    this.alert = {
      "message": message,
      "type":  type
    }
    timer(3000).subscribe(val => {
      this.alert = undefined;
    });
  }

  closeAlert(alert: IAlert) {
    this.alert = undefined;
  }
}


export interface IAlert {
  type: string;
  message: string;
}
