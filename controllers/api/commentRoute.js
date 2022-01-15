const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/',async (req, res) => {
    try{
      const commentData = await Comment.findAll({
        include:[{model:User},{model:Post}],
        // attributes: {include:['name']},
      });
      res.status(200).json(commentData);
    }catch(err) {
      res.status(500).json(err);
    }
  });
  module.exports =router;
