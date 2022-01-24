const router = require('express').Router();
const { User, Post } = require('../../models');
const isAuth = require('../../utils/auth')


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

router.post('/',async (req, res) => {
  try{
    const postData = await Post.create(req.body);
    req.session.save(()=>{
      req.session.user_id = postData.id;
      req.session.logged_in = true;
    })
    res.status(200).json(postData);
  }catch(err) {
    res.status(500).json(err);
  }
});

router.put('/:id', isAuth, async(req,res)=>{
  try{
    const postData = await Post.update({
      title:req.body.title,
      content:res.body.content
    },
    {
      where:{
        id:req.params.id,
      },
    });
    if(!postData){
      res.status(404).json({message:'No post found with this id, try again.'});
    };
    res.status(200).json(postData);
  }catch(err){
    res.status(500).json(err);
  }
})

router.delete('/:id', isAuth, async(req, res)=> {
  try{
    const postData = await Post.destroy({
      where: {
        id:req.params.id,
        user_id:res.session.user_id,
      },
    });
    if(!postData){
      res.status(404).json({message:'No post found with this id!'});
      return;
    }
    res.status(200).json(postData)
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports =router;
