import { Component } from '@angular/core';


type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  showList = true;
  filterText = '';

  users: User[] = [{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', active: true },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', active: false },
  { id: 3, name: 'Carla Gomez', email: 'carla@example.com', active: true },
  { id: 4, name: 'David Ibrahim', email: 'david@example.com', active: false },];

  toggleList(): void {
    this.showList = !this.showList;
  }

}
