const express = require('express')
const router=require('./router')

const app=express()

app.use('/',router)

const server=app.listen(5000,function(){
  const{address,port}=server.address()
  console.log('http服务器已启动,http://127.0.0.1:5000/')
})