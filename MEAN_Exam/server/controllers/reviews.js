console.log('inside of reviews.js');

const mongoose = require("mongoose");
const Review = mongoose.model("Review");
const Movie = mongoose.model("Movie");

class Reviews {

    addReview(req, res){
        let review = new Review(req.body);
        review.save(function(err){
            if(err){
                res.json({"status": "not ok", "errors": err});
            }else{
                Movie.findOne({_id:req.params.id}, function(err, movie){
                    movie.reviews.push(review);
                    let total = 0;
                    for (let r of movie.reviews){
                      console.log(r);
                        total += r.rating;
                    }
                    movie.avgreview = total/movie.reviews.length;
                    console.log(total)
                    movie.save(function(err){
                        if (err){
                            res.json({"status": 'very not ok', "errors": err});
                        }
                        else{
                            res.json({"status": 'ok'});
                        }

                    })
                })
            }
        });
      }

    deleteReview(req,res) {

        Review.findByIdAndRemove({_id:req.params.id}, function(err, data){
            if(err){
                res.json({"status": "not ok", "errors": err});
            }
            else {
                res.json({"status": "ok", "data": data});
            }
        })
    }
}


module.exports = new Reviews();
