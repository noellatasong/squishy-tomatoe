import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  movie = {
    "title": '',
    "initial": {
      "name" : "",
      "rating" : Number,
      "description" : ""
    }
  }
  errors = {};
  constructor(private _ftservice: MovieService, private _router: Router) { }

  ngOnInit() {
  }
  create(){
    let observable = this._ftservice.createMovie(this.movie);
    observable.subscribe(data => {
      console.log(data);
      if (data['status']== 'not ok'){
        this.errors = data['errors']['errors'];
      }
      else {
        this._router.navigate(['/']);
      }
    });
  }

  cancel(){
    this._router.navigate(['/']);
  }
}
