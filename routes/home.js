const express = require('express');
const router  = express.Router();

// HOME PAGE
router.get('/', (req, res, next) => {
  res.render('home',);
});

module.exports = router;
