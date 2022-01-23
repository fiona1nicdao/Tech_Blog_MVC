const router = require('express').Router();
const {User, Post, Comment}= require('../models');
const isAuth = require('../utils/auth')

// Get route for all posts
router.get('/', async (req, res) => {
    try{
      const postData = await Post.findAll({
        include:[
          {model:Comment,
          include:{
            model:User,
            attributes:['name']
          }},
          {model:User,
            attributes:['name']},
        ]
      });
      // console.log(postData)
      const posts = postData.map((post)=>post.get({plain: true}));
      res.render('homepage',{
        posts,
        logged_in: req.session.logged_in,
      });
    }catch(err){
      res.status(500).json(err)
    }
});

// Get route for one post
router.get('/post/:id', async(req,res)=>{
  try{
    const postData = await Post.findByPk(req.params.id, {
      include:[
        {model:User,
          attributes:['name']},
        {model:Comment,
          include:{
            model:User,
            attributes:['name']
          }}
      ]
    });
    const post = postData.get({plain:true});
    res.render('post',{
      ...post,
      logged_in: req.session.logged_in
    })
  }catch(err){
      res.status(500).json(err)
    }
});
// Get route to login
router.get('/login', async(req,res)=>{
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }else {
    res.render('login');
  }
});

// Get route to signup
router.get('/signup', async(req,res)=>{
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }else {
    res.render('signup');
  }
});

// Get route to dashboard
router.get('/dashboard',isAuth,async (req,res)=>{
  // res.render('dashboard')
  try{
    const userData = await User.findByPk(req.session.user_id,{
      attributes:{exclude:['password']},
      include:[
        {model:Post},
        {model:Comment,
        include:{model:Post,
          attributes:['title','id']}
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