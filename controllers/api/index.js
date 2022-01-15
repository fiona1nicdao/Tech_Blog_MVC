const router = require('express').Router();
const userRoute = require('./userRoute');
// const postRoutes = require('./postRoute');
// const commentRoutes = require('./commentRoute');


router.use('/user', userRoute);
// router.use('/post', postRoutes);
// router.use('/comment', commentRoutes);


module.exports = router;