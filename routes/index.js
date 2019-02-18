var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/getUserInfo', function(req, res, next) {
  console.log('请求成功')
  res.status(200).send({
    code:200,
    data: {
      name: 'langNan'
    }
  })
});

module.exports = router;
