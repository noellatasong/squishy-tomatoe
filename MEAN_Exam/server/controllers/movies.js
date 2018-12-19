console.log("inside of movies.js");

const mongoose = require("mongoose");
const Movie = mongoose.model("Movie");

class Movies {
    getAll(req, res){
        Movie.find({}).sort({"avgreview" : -1}).exec( function(err, movies){
            if(err){
                res.json({"status": "not ok", "errors": err});
            }else{
                res.json({"status": "ok", "movies": movies});
            }
        });
    }

    getId(req, res){
        Movie.findOne({_id: req.params.id}, function(err, movie){
          if(err){
              res.json({"status": "not ok", "errors": err});
          }
          else{
              res.json({"status": "ok", "movie": movie});
          }
        });
    }

    create(req, res){
        Movie.find({title: req.body.title}, function(err, movies){
            if (err) {
                res.json({"status": "not ok", "errors": err});
            } else if(movies.length > 0){
                res.json(
                    {"status": "not ok",
                        "errors": {
                            "errors": {
                                "name": {
                                    "message": "Pick something else"
                                }
                            }
                        }
                    });
            } else {
                let movie = new Movie(req.body);
                movie.save(function(err){
                    if(err){
                        res.json({"status": "not ok", "errors": err});
                    }else{
                        res.json({"status": "ok", "id": movie._id});
                    }
                });
            }
        })
    }

    delete(req, res){
      Movie.remove({_id: req.params.id}, function(err){
        if(err){
            res.json({"status": "not ok", "errors": err});
        }else{
            res.json({"status": "ok"});
        }
      });
    }
}

module.exports = new Movies();
