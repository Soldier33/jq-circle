var express = require('express')
var bodyParser = require('body-parser')
var loginRouter = require('./router/loginRouter')
var userRouter = require('./router/userRouter')
var adminRouter = require('./router/adminRouter')
var path = require('path')
const cookieParser = require('cookie-parser')


var app = express()
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.engine('html', require('express-art-template'))

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


app.use(loginRouter)
app.use(userRouter)
app.use(adminRouter)


app.listen(3000, function () {
    console.log('http://localhost:3000/')
})