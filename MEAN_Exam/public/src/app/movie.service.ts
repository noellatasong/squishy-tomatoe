import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private _http: HttpClient) { }

  getAllMovies(){
    return this._http.get('/movies');
  }
  createMovie(Movie){
    return this._http.post('/movie', Movie);
  }
  getOne(id){
    return this._http.get(`/movie/${id}`);
  }

  addReview(id, review){
    return this._http.post(`/movie/${id}/review`, review);
  }

  // updateOne(id, truck){
  //   return this._http.put(`/movie/${id}`, t);
  // }

  deleteOne(id){
    return this._http.delete(`/movie/${id}`);
  }

  deleteReview(id) {
  return this._http.delete(`/review/${id}`);
  }
}
