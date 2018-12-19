import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  movies = [];

  constructor(private _ftservice: MovieService) { }

  ngOnInit() {
    this.getAllMovies();
  }

  getAllMovies(){
    let observable = this._ftservice.getAllMovies();
    observable.subscribe( data => {
      this.movies = data['movies'];
      console.log(data);
    });
  }

}
