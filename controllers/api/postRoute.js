const router = require('express').Router();
const { User, Post } = require('../../models');

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
  module.exports =router;
