'use strict';
const Comments = require( '../models/Comments' );

exports.saveComments = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  let newComments = new Comments( {
    Name: req.body.Name,
    Email: req.body.Email,
    Subject:req.body.Subject,
    Details:req.body.Details,
    }
  )

  //console.log("skill = "+newSkill)

  newComments.save()
    .then( () => {
      res.redirect( '/showComments' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.getAllComments = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  Comments.find( )
    .exec()
    .then( ( Comments ) => {
      res.render( 'Comments', {
        Comments: Comments
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    } );
};

exports.getOneComment = ( req, res ) => {
   //gconsle.log('in getAllSkills')
   const id = req.params.id
   console.log('the id is '+id)
   Comments.findOne({_id:id})
     .exec()
     .then( ( comment ) => {
       console.log("comment is:")
       console.dir(comment)
       res.render( 'comment', {
         comment:comment, title:"Comment"
       } );
     } )
     .catch( ( error ) => {
       console.log( error.message );
       return [];
     } )
     .then( () => {
       //console.log( 'skill promise complete' );
     } );
 };
