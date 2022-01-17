const router = require('express').Router();
const path = require('path');
// const Post = require('../models');


// This is the 'get' route 
router.get('/', async (req, res) => {
    try{
      // const postData = await Post.findAll({
      //   include:[User]
      // })
      // console.log(postData)
      // const blog = postData.get({plain: true});
      res.render('homepage')
    }catch(err){
      res.status(500).json(err)
    }
  });
  
  module.exports = router;