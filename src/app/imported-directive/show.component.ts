
import { Component, Input, OnInit } from "@angular/core";
import { ShowService } from "app/imported-directive/show.service";
import { Response } from '@angular/http';
 
@Component({
    selector: 'show-component',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit{
    constructor(private showService: ShowService) { }

    @Input('showElement') show;

    genres = [];


    ngOnInit(){
        this.showService.get(this.show.id).subscribe(
            (response: Response) => {
                this.genres = response.json()['genres']
            }
        )
    }

}