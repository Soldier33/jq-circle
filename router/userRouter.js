var express = require('express')

var router = express.Router()

var DB = require('../database/DB')

var getCircleSql = 'select cname from circles where cname=?'
var getUserCircleSql = 'select * from user_circles where nickname=?'
var getAddCircleSql = 'INSERT INTO user_circles(nickname, cname) VALUES(?,?)'
var addCircleSqlParams = new Array(2)
var updataUserCircle = 'UPDATE user SET circle=? WHERE nickname=?'
var updataUserCircleParams = new Array(2)
var deleteUserCircle = 'DELETE FROM user_circles WHERE cname=? AND nickname=?'
var deleteUserCircleParams = new Array(2)
var getNowCircleSql = 'select * from user where nickname=?'

var getCircleTopicSql = 'SELECT * FROM topics WHERE circle=?'

var getUserContentSql = 'SELECT * FROM contents WHERE circle=? AND topic=?'
var getUserContentSqlParams = new Array(2)
var addUserContentSql = 'INSERT INTO contents(content, topic, circle, nickname) VALUES(?,?,?,?)'
var addUserContentSqlParams = new Array(4)

// 用户模块
  router.get('/topic', function (req, res) {
    DB.queryArgs(getUserCircleSql,req.cookies.nickname,function(err, rows) {
      if(err) throw err
      else {    
        DB.queryArgs(getNowCircleSql,req.cookies.nickname,function(err2, rows2) {
          DB.queryArgs(getCircleTopicSql,req.cookies.circle,function(err3, rows3) {
            res
              .cookie('circle',rows2[0].circle)
              .render('topic.html',{"data":rows,"now":rows2,"topic":rows3})
          })
        })
      }
    })   
  })

  router.get('/content/topic', function (req, res) {
    getUserContentSqlParams[0] = req.cookies.circle
    getUserContentSqlParams[1] = req.query.topic
    DB.queryArgs(getUserContentSql,getUserContentSqlParams,function(err, rows) {
      if(err) throw err   
      console.log(rows);
      
      res
        .cookie('topic',req.query.topic)
        .render('content.html', {"data":rows})
    })   
  })

  router.post('/content/topic', function (req, res) {
    addUserContentSqlParams[0] = req.body.content
    addUserContentSqlParams[1] = req.cookies.topic
    addUserContentSqlParams[2] = req.cookies.circle
    addUserContentSqlParams[3] = req.cookies.nickname
    DB.queryArgs(addUserContentSql,addUserContentSqlParams,function(err, rows) {
      if(err) throw err   
      console.log(rows);
      
      res
        .end('4')
    })   
  })


  router.get('/notice', function (req, res) {
    DB.queryArgs(getUserCircleSql,req.cookies.nickname,function(err, rows) {
      if(err) throw err
      res.render('notice.html', {"data":rows})
    })   
  })
  
  router.get('/message', function (req, res) {
    DB.queryArgs(getUserCircleSql,req.cookies.nickname,function(err, rows) {
      if(err) throw err
      res.render('message.html', {"data":rows})
    })   
  })
  
  router.get('/shop', function (req, res) {
    DB.queryArgs(getUserCircleSql,req.cookies.nickname,function(err, rows) {
      if(err) throw err 
      res.render('shop.html', {"data":rows})
    })   
  })
  
  router.get('/team', function (req, res) {
    DB.queryArgs(getUserCircleSql,req.cookies.nickname,function(err, rows) {
      if(err) throw err 
      res.render('team.html', {"data":rows})
    })   
  })
  
  router.get('/find', function (req, res) {
    DB.queryArgs(getUserCircleSql,req.cookies.nickname,function(err, rows) {
      if(err) throw err
      res.render('find.html', {"data":rows})
    })   
  })
  
  router.get('/set', function (req, res) {
    DB.queryArgs(getUserCircleSql,req.cookies.nickname,function(err, rows) {
      if(err) throw err
      res.render('set.html', {"data":rows})
    })   
  })
  
  
  router.get('/user/circle', function (req, res) {
    DB.queryArgs(getCircleSql,req.query.cname,function(err, rows) {
      if(err) throw err
      if(JSON.stringify(rows) === '[]') {
        res.end('0')
      } else {
        res.json(rows[0].cname)
      }
    })   
  })
  router.get('/user/addCircle', function (req, res) {
    addCircleSqlParams[0] = req.query.nickname
    addCircleSqlParams[1] = req.query.cname
    DB.queryArgs(getAddCircleSql,addCircleSqlParams,function(err, rows) {
      if(err) throw err
      res.end('0')
    })   
  })
  router.get('/user/deleteUserCircle', function (req, res) {
    deleteUserCircleParams[0] = req.query.circle
    deleteUserCircleParams[1] = req.cookies.nickname
    DB.queryArgs(deleteUserCircle,deleteUserCircleParams,function(err, rows) {
      if(err) throw err
      res.redirect('/topic')
    })   
  })

  router.get('/user/updataUserCircle', function (req, res) {
    updataUserCircleParams[0] = req.query.circle
    updataUserCircleParams[1] = req.cookies.nickname
    DB.queryArgs(updataUserCircle,updataUserCircleParams,function(err, rows) {
      if(err) throw err
      DB.queryArgs(getCircleTopicSql,req.query.circle,function(err3, rows3) {   
        res.json(rows3)
      })
    })   
  })

module.exports = router