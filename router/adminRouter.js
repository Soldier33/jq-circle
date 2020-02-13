var express = require('express')

var router = express.Router()

var DB = require('../database/DB')

// 超级管理员模块

var getUserSql = 'SELECT * FROM user'
var addUserSql = 'INSERT INTO user(nickname, email, passwd, circle) VALUES(?,?,?,?)'
var addUserSqlParams = new Array(3)
var deleteUserSql = 'DELETE FROM user WHERE nickname=?'

var addCircleSql = 'INSERT INTO circles(cname, cbrief) VALUES(?,?)'
var addCircleSqlParams = new Array(2)
var getCircleSql = 'SELECT * FROM circles'
var deleteCircleSql = 'DELETE FROM circles WHERE cname=?'

var addTopicSql = 'INSERT INTO topics(topic, circle) VALUES(?,?)'
var addTopicSqlParams = new Array(2)
var getTopicSql = 'SELECT * FROM topics'
var deleteTopicSql = 'DELETE FROM topics WHERE topic=?'

var getContentSql = 'SELECT * FROM contents WHERE circle=? AND topic=?'
var getContentSqlParams = new Array(2)
var addContentSql = 'INSERT INTO contents(topic, circle, content, nickname) VALUES(?,?,?,?)'
var addContentSqlParams = new Array(4)
var deleteContentSql = 'DELETE FROM contents WHERE contentId=?'

  router.get('/admin/user', function (req, res) {
    DB.query(getUserSql,function(err, rows) {
      if(err) throw err
      res.render('adminUser.html', {"data":rows})
    })   
  })

  router.post('/admin/user', function (req, res) {
    addUserSqlParams[0] = req.body.nickname
    addUserSqlParams[1] = req.body.email
    addUserSqlParams[2] = req.body.passwd
    addUserSqlParams[3] = req.body.circle
    DB.queryArgs(addUserSql,addUserSqlParams,function(err, rows) {
      if(err) {
        console.log('[DELETE ERROR] - ',err.message);
        res.end('fail')
      }     
      else {      
        res.end('222')
      }
    })
  })

  router.get('/admin/user/delete', function (req, res) {
    console.log(req.query.nickname);
    
    DB.queryArgs(deleteUserSql,req.query.nickname,function(err, rows) {
      if(err) {
        console.log('[DELETE ERROR] - ',err.message);
        res.end('fail')
      }     
      else
        res.send('<p>删除成功</p>');
    })
  })

  router.get('/admin/circle', function (req, res) {
    DB.query(getCircleSql,function(err, rows) {
      if(err) throw err
      res.render('adminCircle.html', {"data":rows})
    })   
  })
  
  router.post('/admin/circle', function (req, res) {
    addCircleSqlParams[0] = req.body.cname
    addCircleSqlParams[1] = req.body.cbrief
    DB.queryArgs(addCircleSql,addCircleSqlParams,function(err, rows) {
      if(err) {
        console.log('[DELETE ERROR] - ',err.message);
        res.end('fail')
      }     
      else
        res.end('222')
    })
  })
  
  router.get('/admin/circle/delete', function (req, res) {
    DB.queryArgs(deleteCircleSql,req.query.cname,function(err, rows) {
      if(err) {
        console.log('[DELETE ERROR] - ',err.message);
        res.end('fail')
      }     
      else
        res.send('<p>删除成功</p>');
    })
  })
  
  
  router.get('/admin/topic', function (req, res) {
    DB.query(getTopicSql,function(err, rows) {
      if(err) throw err
      res.render('adminTopic.html', {"data":rows})
    })   
  })
  
  router.post('/admin/topic', function (req, res) {
    addTopicSqlParams[0] = req.body.topic
    addTopicSqlParams[1] = req.body.circle
    DB.queryArgs(addTopicSql,addTopicSqlParams,function(err, rows) {
      if(err) {
        console.log('[DELETE ERROR] - ',err.message);
        res.end('fail')
      }     
      else
        res
          .end('222')
    })
  })
  router.get('/admin/topic/delete', function (req, res) {
    DB.queryArgs(deleteTopicSql,req.query.topic,function(err, rows) {
      if(err) {
        console.log('[DELETE ERROR] - ',err.message);
        res.end('fail')
      }     
      else
        res.redirect('/admin/topic');
    })
  })
  
  router.get('/admin/topic/content', function (req, res) {
    getContentSqlParams[0] = req.query.circle
    getContentSqlParams[1] = req.query.topic
    DB.queryArgs(getContentSql,getContentSqlParams,function(err, rows) {
      if(err) throw err   
      res
        .cookie('circle',req.query.circle)
        .cookie('topic',req.query.topic)
        .render('adminContent.html', {"data":rows})
    })   
  })
  
  router.post('/admin/topic/content', function (req, res) {
    addContentSqlParams[0] = req.body.topic
    addContentSqlParams[1] = req.body.circle
    addContentSqlParams[2] = req.body.content
    addContentSqlParams[3] = 'admin'
    DB.queryArgs(addContentSql,addContentSqlParams,function(err, rows) {
      if(err) {
        console.log('[DELETE ERROR] - ',err.message);
        res.end('fail')
      }     
      else
        res
          .end('222')
    })
  })

  router.get('/admin/topic/content/delete', function (req, res) {
    DB.queryArgs(deleteContentSql,req.query.contentId,function(err, rows) {
      if(err) {
        console.log('[DELETE ERROR] - ',err.message);
        res.end('fail')
      }     
      else
        res.redirect(`/admin/topic/content?topic=${req.cookies.topic}&circle=${req.cookies.circle}`);
    })
  })
module.exports = router