var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const getPasswordByName = (name) => {
  return { password: '123'}
}
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

// login
router.post('/login',function(req, res, next) {
  const { userName, password } = req.body
  if( userName ){
    const userInfo = password ? getPasswordByName(userName) : ''
    if(!userInfo || !password || userInfo.password !== password) {
      res.status(401).send({
        code: 401,
        mes: 'user name or password is wrong',
        data: {}
      })
    } else {
      res.send({
        code: 200,
        mes: 'success',
        data: {
          token: jwt.sign({ name: userName }, 'abcd', {
            expiresIn: 60 * 60
          })
        }
      })
    }
  } else {
    res.status(401).send({ 
      code: 401,
      mes: 'user name is empty',
      data: {}
    })
  }
})
module.exports = router;
