'use strict';
const Recipe = require( '../models/Recipes' );
const User = require( '../models/User' );

exports.saveRecipes = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  if (!res.locals.loggedIn) {
    return res.send("You must be logged in to post to the forum.")
  }


  let newRecipe = new Recipe(
   {
    userId: req.user._id,
    userName: req.user.googlename,
    dishName: req.body.dishName,
    dishIngre: req.body.dishIngre,
    dishDescription: req.body.dishDescription,
    dish_createdAt: new Date()
   }
  )

  //console.log("skill = "+newSkill)

  newRecipe.save()
    .then( () => {
      res.redirect( 'recipes' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

// this displays all of the skills
exports.getAllRecipe = ( req, res, next ) => {
  //gconsle.log('in getAllSkills')
  Recipe.find({}).sort({dish_createdAt: -1})
    .exec()
    .then( ( recipes ) => {
      res.render('recipes',{recipes:recipes,title:"Recipes"})
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    } );
};

exports.deleteRecipe = (req, res) => {
	  console.log("in deleteRecipe")
	  let deleteId = req.body.delete
	  if (typeof(deleteId)=='string') {
	      // you are deleting just one thing ...
	      Recipe.deleteOne({_id:deleteId})
	           .exec()
	           .then(()=>{res.redirect('/recipes')})
	           .catch((error)=>{res.send(error)})
	  } else if (typeof(deleteId)=='object'){
	      Recipe.deleteMany({_id:{$in:deleteId}})
	           .exec()
	           .then(()=>{res.redirect('/recipes')})
	           .catch((error)=>{res.send(error)})
	  } else if (typeof(deleteId)=='undefined'){
	      //console.log("This is if they didn't select a skill")
	      res.redirect('/recipe')
	  } else {
	    //console.log("This shouldn't happen!")
	    res.send(`unknown deleteId: ${deleteId} Contact the Developer!!!`)
	  }

	};
