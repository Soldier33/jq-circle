var express = require('express')

var router = express.Router()

var DB = require('../database/DB')

var registerSql = 'INSERT INTO user(nickname, email, passwd) VALUES(?,?,?)'
var registerSqlParams = new Array(3)
var loginSql = 'SELECT * FROM user WHERE nickname=? and passwd=?'
var loginSqlParams = new Array(2)
var resetSql = 'UPDATE user SET passwd=? WHERE email=?'
var resetSqlParams = new Array(2)


//登出模块
router.get('/auth/out', function (req, res) {
  res.redirect('/auth/login')
})

// 登录模块
router.get('/', function (req, res) {
  res.render('index.html')
})

router.get('/auth/register', function (req, res) {
  res.render('register.html')
})

router.post('/auth/register/user', function(req, res) {
  var flag = req.body.nickname.indexOf('visitor')
  registerSqlParams[0] = req.body.nickname
  registerSqlParams[1] = req.body.email
  registerSqlParams[2] = req.body.passwd
  DB.queryArgs(registerSql,registerSqlParams,function(err, rows) {
    if(err) {
      console.log('[DELETE ERROR] - ',err.message);
      res.send('用户已存在')
    }     
    else
      if(flag!==-1)
        res
          .cookie('nickname',req.body.nickname)
          .end('33')
      else
        res
          .cookie('nickname',req.body.nickname)
          .redirect('/topic')
  })
})

router.get('/auth/login', function (req, res) {
  res.render('login.html')
})

router.post('/auth/login', function (req, res) {
  res.render('login.html')
})

router.post('/auth/login/user', function(req, res) {
  registerSqlParams[0] = req.body.nickname
  registerSqlParams[2] = req.body.passwd
  DB.queryArgs(loginSql,loginSqlParams,function(err, rows) {
    if(err) {
      console.log('[DELETE ERROR] - ',err.message);
      res.end('fail')
    }     
    else {
      if(req.body.nickname==='admin' && req.body.passwd ==='admin') {
        res
          .cookie('nickname',req.body.nickname)
          .redirect('/admin/circle')
      } else {
        res
          .cookie('nickname',req.body.nickname)
          .redirect('/topic')
      }   
    }
     
  })
})

router.get('/password/reset', function (req, res) {
  res.render('pwdReset.html')
})

router.post('/password/reset', function (req, res) {
  res.render('pwdReset.html')
})

router.post('/password/reset/user', function(req, res) {
  resetSqlParams[0] = req.body.passwd
  resetSqlParams[1] = req.body.email
  DB.queryArgs(resetSql,resetSqlParams,function(err, rows) {
    if(err) {
      console.log('[DELETE ERROR] - ',err.message);
      res.end('fail')
    }     
    else {
      res.redirect('/topic')
    }      
  })
})

module.exports = router

