const express = require('express')       //引入express框架
const router=require('./router')         //引入路由
const fs = require('fs')                 //引入用于文件操作的组件
const https = require('https')           //引入用于搭建https服务的组件
const bodyParser = require('body-parser')//引入用于解析request请求包的中间件
const cors=require('cors')               //引入用于解决跨域问题的中间件

const app=express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/',router)

const privateKey = fs.readFileSync('https/3750007_yaoluolong.xyz.key', 'utf8')
const certificate = fs.readFileSync('https/3750007_yaoluolong.xyz.pem', 'utf8')
const credentials = { key: privateKey, cert: certificate }
const httpsServer = https.createServer(credentials, app)
const SSLPORT = 18082

httpsServer.listen(SSLPORT, function() {
  console.log('HTTPS服务器已启动: https://localhost:%s', SSLPORT)
})
