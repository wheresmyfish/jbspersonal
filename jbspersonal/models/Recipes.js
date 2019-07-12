'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var recipesSchema = Schema( {
  userId: ObjectId,
  userName: String,
  dishName: String,
  dishIngre: String,
  dishDescription: String,
  dish_createdAt: Date
} );

module.exports = mongoose.model( 'Recipes', recipesSchema );
