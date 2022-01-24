const router = require('express').Router();
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
router.get('/:id',async(req,res)=>{

    try{
      const commentData = await Comment.findAll({
        include:[
          {model:User,
          attributes:['name']},
          {model:Post,
          attributes:['id']}
        ]
      });
      if(!commentData){
        res.status(404).json({message:'no comment found with that id'});
      }
      res.status(200).json(commentData);
    }catch(err) {
      res.status(500).json(err);
    }

})

router.post('/',async (req, res) => {
  try{
    const commentData = await Comment.create(req.body);
    req.session.save(()=>{
      req.session.user_id =commentData.id;
      req.session.logged_in =true;
    })
    res.status(200).json(commentData);
  }catch(err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async(req, res)=>{
  try{
    const commentData = await Comment.update({
      content:req.body.content
    },
    {
      where:{
        id:req.params.id,
      },
    });
    if(!commentData){
      res.status(404).json({message:'No comment found with this id, try again'});
      return;
    };
    res.status(200).json(commentData);
  }catch(err){
    res.status(500).json(err);
  }
})
router.delete('/:id', isAuth, async(req, res)=>{
  try{
    const commentData = await Comment.destroy({
      where:{
        id: req.params.id,
        user_id:req.session.user_id,
      }
    });
    if(!commentData){
      res.status(404).json({message: 'No comment found with this id!'});
    };
    res.status(200).json(commentData)
  }catch(err){
    res.status(500).json(err);
  }
})


module.exports =router;
