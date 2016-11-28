
// BASE SETUP
// =============================================================================
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var morgan     = require('morgan');
var path = require('path');


var port = process.env.PORT || 8080;        // set our port

// MODELS
var Recipe     = require('./models/recipe');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://test:test@ds143767.mlab.com:43767/recipe-box'); // connect to our database






// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();
var site = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// on routes that end in /recipes
// ----------------------------------------------------
router.route('/recipes')

    // create a recipe (accessed at POST http://localhost:8080/recipes)
    .post(function(req, res) {

        var recipe = new Recipe();		// create a new instance of the Recipe model
        recipe.title = req.body.title;
        recipe.subTitle = req.body.subTitle;
        recipe.description = req.body.description;
        recipe.cookTime = req.body.cookTime;
        recipe.serves = req.body.serves;
        recipe.calories = req.body.calories;
        recipe.rating = req.body.rating;
        recipe.ingredients  = req.body.ingredients;
        recipe.otherStuff  = req.body.otherStuff;
        recipe.directions  = req.body.directions;
        recipe.tips  = req.body.tips;
        recipe.imagePath  = req.body.imagePath;



        // set the recipes name (comes from the request)

        recipe.save(function(err) {
            if (err)
                res.send(err);

            res.json(recipe);
        });


    })

    // get all the recipes (accessed at GET http://localhost:8080/api/recipes)
    .get(function(req, res) {
        Recipe.find(function(err, recipes) {
            if (err)
                res.send(err);

            res.json(recipes);
        });
    });

// on routes that end in /recipes/:recipe_id
// ----------------------------------------------------
router.route('/recipes/:recipe_id')

    // get the recipe with that id
    .get(function(req, res) {
        Recipe.findById(req.params.recipe_id, function(err, recipe) {
            if (err)
                res.send(err);
            res.json(recipe);
        });
    })

    // update the recipe with this id
    .put(function(req, res) {
        Recipe.findById(req.params.recipe_id, function(err, recipe) {

            if (err)
                res.send(err);

            recipe.title = req.body.title;
            recipe.subTitle = req.body.subTitle;
            recipe.description = req.body.description;
            recipe.cookTime = req.body.cookTime;
            recipe.serves = req.body.serves;
            recipe.calories = req.body.calories;
            recipe.rating = req.body.rating;
            recipe.ingredients  = req.body.ingredients;
            recipe.otherStuff  = req.body.otherStuff;
            recipe.directions  = req.body.directions;
            recipe.tips  = req.body.tips;
            recipe.imagePath  = req.body.imagePath;

            recipe.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Recipe updated!' });
            });

        });
    })

    // delete the recipe with this id
    .delete(function(req, res) {
        Recipe.remove({
            _id: req.params.recipe_id
        }, function(err, recipe) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


// REGISTER OUR ROUTES
// =============================================================================
app.use('/api', router);
app.use(express.static('../client', {
    index: 'index.html'
}))



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);