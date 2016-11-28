// models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RecipeSchema   = new Schema({
    title: String,
    subTitle: String,
    description: String,
    cookTime: String,
    imagePath: String,
    serves: Number ,
    calories: Number ,
    rating: Number,
    ingredients: [],
    otherStuff: [],
    directions: [],
    tips: []


});

module.exports = mongoose.model('Recipe', RecipeSchema);