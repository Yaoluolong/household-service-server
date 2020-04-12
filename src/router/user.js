const express = require('express')
const Result=require('../models/Result')

const router = express.Router()

router.post('/login', function(req, res, next) {
  console.log('/user/login', req.body)
  new Result('登录成功').success(res)
})

router.get('/info', function(req, res, next) {
  res.json('user info...')
})

module.exports = router