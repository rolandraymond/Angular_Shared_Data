import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Shared } from '../../shared';

@Component({
  selector: 'app-child-component',
  standalone: false,
  templateUrl: './child-component.html',
  styleUrl: './child-component.css'
})
export class ChildComponent {
  message: string = 'Hello from Child!';
  @Input() username?: string;
  @Output() messageEvent = new EventEmitter<string>();
  sendMessage() {
    this.messageEvent.emit(this.message);
  }

  newMessage: string = '';

  constructor(private shared: Shared) { }

  updateMessage() {
    this.shared.setMessage(this.newMessage);
  }
}
