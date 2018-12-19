import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  movie: any;
  newreview = {
    "name" : "",
    "rating" : Number,
    "description" : ""
  }
  errors = {};

  constructor(private _ftservice: MovieService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
      this.getMovie(params['id']);
    })
  }

  getMovie(id){
    let observable = this._ftservice.getOne(id);
    observable.subscribe( data => {
      this.movie = data['movie'];
    })
  }

  newRating(id){
    let observable = this._ftservice.addReview(id, this.newreview);
    observable.subscribe( data => {
      if (data['status']== 'not ok'){
        this.errors = data['errors']['errors'];
      }else{
        this.getMovie(id);
        this.newreview = {
          "name" : "",
          "rating" : Number,
          "description" : ""
        }
        this._router.navigate(['/single/', id]);
      }
    });
  }

  cancel(){
    this._router.navigate(['/']);
  }
}
