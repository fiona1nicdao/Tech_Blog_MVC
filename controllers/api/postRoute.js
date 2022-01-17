const router = require('express').Router();
const { User, Post } = require('../../models');
const isAuth = require('../utils/auth')


router.get('/',async (req, res) => {
    try{
      const postData = await Post.findAll({
        include:[{model:User}],
      });
      res.status(200).json(postData);
    }catch(err) {
      res.status(500).json(err);
    }
});

router.post('/',isAuth,async (req, res) => {
  try{
    const postData = await Post.create({
      ...res.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(postData);
  }catch(err) {
    res.status(500).json(err);
  }
});

// make a route.delete
// make a route.put

module.exports =router;
