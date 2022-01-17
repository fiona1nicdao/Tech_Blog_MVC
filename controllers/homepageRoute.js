const router = require('express').Router();
const {User, Post, Comment}= require('../models');
const isAuth = require('../utils/auth')
const path = require('path');
const { route } = require('./api');

// This is the 'get' route 
router.get('/', async (req, res) => {
    try{
      const postData = await Post.findAll({
        include:[
          {model:User,
          attributes:['name']},
          {model:Comment}
        ]
      })
      // console.log(postData)
      const blog = postData.map((post)=>post.get({plain: true}));
      res.render('homepage',{
        blog,
        logged_in: req.session.logged_in,
      })
    }catch(err){
      res.status(500).json(err)
    }
});

route.get('/post/:id', async(req,res)=>{
  try{

  }catch(err){
      res.status(500).json(err)
    }
})
  
module.exports = router;