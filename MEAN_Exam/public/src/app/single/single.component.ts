import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  movie: any;
  reviews = [];

  constructor(private _ftservice: MovieService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
      this.getMovie(params['id']);
    })
  }

  getMovie(id){
    let observable = this._ftservice.getOne(id);
    observable.subscribe( data => {
      this.movie = data['movie']
      this.reviews = data['movie']['reviews'];
    })
  }

  delete(id){
    let observable = this._ftservice.deleteOne(id);
    observable.subscribe( data => {
      this._router.navigate(['/']);

    })
  }

  deleteReview(id) {

    let index = this.movie.reviews.findIndex( i => i._id === id);
    this.movie.reviews.splice(index,1);

    let observable = this._ftservice.deleteReview(id);
    observable.subscribe( data => {
      console.log("Deleting Review!!");
    })
  }

}
