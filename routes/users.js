var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/authorization', (req, res, next) => {
  const userName = req.userName
  //重新生成token
  res.send({
    code: 200,
    mes: 'success',
    data: {
      token: jwt.sign({ name: userName}, 'abcd', {
        expiresIn: 60 * 60
      })
    }
  })
} )
module.exports = router;
