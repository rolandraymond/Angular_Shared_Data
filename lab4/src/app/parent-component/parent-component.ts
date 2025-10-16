import { Component } from '@angular/core';
import { Shared } from '../shared';

@Component({
  selector: 'app-parent-component',
  standalone: false,
  templateUrl: './parent-component.html',
  styleUrl: './parent-component.css'
})
export class ParentComponent {
  username: string = 'Roland';
  parentMessage: string = '';
  sharedMessage: string = '';
  receiveMessage(message: string) {
    this.parentMessage = message;
  }

  constructor(private shared: Shared) { }
  readMessage() {
    this.parentMessage = this.shared.getMessage();
  }
}
