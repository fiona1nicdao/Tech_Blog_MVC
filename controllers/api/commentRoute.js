const router = require('express').Router();
const { route } = require('.');
const { User, Post, Comment } = require('../../models');
const isAuth = require('../../utils/auth')


router.get('/',async (req, res) => {
    try{
      const commentData = await Comment.findAll({
        include:[
          {model:User,
          attributes:['name']},
          {model:Post,
          attributes:['id']}
        ]
      });
      res.status(200).json(commentData);
    }catch(err) {
      res.status(500).json(err);
    }
});

router.post('/',isAuth,async (req, res) => {
  try{
    const commentData = await Comment.create({
      ...res.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  }catch(err) {
    res.status(500).json(err);
  }
});

// make a route.delete
// make a route.put

module.exports =router;
