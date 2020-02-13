var mysql = require('mysql')
var dbconfig = require('./database')

var pool = mysql.createPool(dbconfig.mysql)

function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        connection.query(sql, function(err, rows) {
           callback(err, rows)
            connection.release()
        })
    })
}

function queryArgs(sql, args, callback) {
    pool.getConnection(function (err, connection) {
        connection.query(sql, args, function(err, rows) {
           callback(err, rows)
            connection.release()
        })
    })
}


module.exports = {
    query: query,
    queryArgs: queryArgs,
}