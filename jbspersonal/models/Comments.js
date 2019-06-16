'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var CommentsSchema = Schema( {
  Name: String,
  Email: String,
  Subject:String,
  Details:String,

} );

module.exports = mongoose.model( 'Comments', CommentsSchema);
