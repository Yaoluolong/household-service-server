const express =require('express')

const app=express()

app.get('/',function(req,res){
  res.send('hello node')
})

const server=app.listen(5000,function(){
  const{address,port}=server.address()
  console.log('http服务器已启动,http://127.0.0.1:5000/')
})