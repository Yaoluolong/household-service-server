const express = require('express')
const boom = require('boom')          //引入用于处理404请求的中间件
const userRouter = require('./user')
const staffRouter = require('./staff')
const uploadRouter=require('./upload')
const classRouter = require('./class')
const orderRouter = require('./order')
const evaluateRouter = require('./evaluate')
const commodityRouter = require('./commodity')
const { jwtAuth } = require('./jwt')
const Result = require('../models/Result')

// 注册路由
const router = express.Router()


router.use(jwtAuth)

router.get('/', (req, res) => {
  return res.send('Hello Household')
})

router.use('/user', userRouter)
router.use('/staff', staffRouter)
router.use('/upload',uploadRouter)
router.use('/class',classRouter)
router.use('/commodity',commodityRouter)
router.use('/order',orderRouter)
router.use('/evaluate',evaluateRouter)

/*
  集中处理404请求的中间件
 */
router.use((req, res, next) => {
  next(boom.notFound('地址不存在'))
})

/*
  自定义路由异常处理中间件
 */
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    new Result(null, 'token失效', {
      error: err.status,
      errorMsg: err.name
    }).expired(res.status(err.status))
  }
  else {
    const msg = (err && err.message) || '系统错误'
    const statusCode = (err.output && err.output.statusCode) || 500;
    const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message
    new Result(null, msg, {
      error: statusCode || status,
      errorMsg
    }).fail(res.status(statusCode))
  }

})

module.exports = router