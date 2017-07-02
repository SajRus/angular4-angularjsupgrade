import { Component, OnInit, Input } from '@angular/core';
import { ShowService } from "app/imported-directive/show.service";

import { Response } from '@angular/http';

@Component({
  selector: 'app-premieres',
  templateUrl: './premieres.component.html',
  styleUrls: ['./premieres.component.css']
})
export class PremieresComponent implements OnInit {

  constructor(private showService: ShowService) { }
  show = [];
  ngOnInit() {
      this.showService.getPremieres().subscribe(
            (response: Response) => {
                this.show = response.json()['show']
            }
        )
  }

}
