import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Shared {
  sharedMessage: string = 'Initial shared message';

  setMessage(newMessage: string) {
    this.sharedMessage = newMessage;
  }

  getMessage(): string {
    return this.sharedMessage;
  }
}
