import { Component, ViewEncapsulation } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { CellService } from '../../../services/cell.service';
import { Cell } from '../../../models/cell';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent {

  cells: Cell[];
  user: User;

  settings = {
    clickable: true,
    columns: [
      {
        name: 'name',
        title: 'Nom'
      }
    ]
  };

  constructor(private cellService: CellService,
              private userService: UserService,
              private router: Router) {
    this.userService.getProfile().subscribe(
      data => {
        this.user = data;
      }
    );
    this.cellService.getCells().subscribe(
      data => {
        this.cells = data.results.map(c => new Cell(c) );
      }
    );
  }

  selectUser(cell) {
    this.router.navigate(['/activities/' + cell.id]);
  }

}
