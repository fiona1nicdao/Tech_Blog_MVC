const router = require('express').Router();
const apiRoutes = require('./api');
const homepageRoutes = require('./homepageRoute');


router.use('/api', apiRoutes);
router.use('/', homepageRoutes);


// router.use((req, res) => {
//     res.send("<h1>Wrong Route!</h1>")
// });

module.exports = router;