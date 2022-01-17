const router = require('express').Router();
const {User, Post, Comment}= require('../models');
const isAuth = require('../utils/auth')
const path = require('path');
const { route } = require('./api');

// Get route for all posts
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

// Get route for one post
route.get('/post/:id', async(req,res)=>{
  try{
    const postData = await Post.findByPk(req.params.id, {
      include:[
        {model:User,
          attributes:['name']},
        {model:Comment}
      ]
    });
    const blog = postData.get({plain:true});
    res.render('post',{
      ...blog,
      logged_in: req.session.logged_in
    })
  }catch(err){
      res.status(500).json(err)
    }
});

// Get route to signup
route.get('/signup', async(req,res)=>{
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

// Get route to dashboard
route.get('.dashboard', isAuth, async(res,res)=>{
  try{
    const userData = await User.findByPk(req.session.user_id,{
      attributes:{exclude:['password']},
      include:[
        {model:Post},
        {model:Comment,
        include:{model:Post,attributes:['title']}
        }
      ]
    });
    const user = userData.get({plain:true});
    res.render('dashboard',{
      ...user,
      logged_in:true,
    });
  }catch(err){
      res.status(500).json(err)
    }
});

// get route for newpost?
// get route for editpost?
// get route for editcomment?
  
module.exports = router;