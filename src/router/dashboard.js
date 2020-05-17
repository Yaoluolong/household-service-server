const express = require('express')
const Result = require('../models/Result')
const { staff,evaluate,promotion,commodity } = require('../service/dashboard')

const router = express.Router()

router.get('/staff',(req,res)=>{
  staff().then(result=>{
    if (result) {
      new Result(result, '查询成功').success(res)
    } else {
      new Result('查询失败').fail(res)
    }
  }).catch(err=>{
    console.log(err)
  })
})

router.get('/evaluate',(req,res)=>{
  evaluate().then(result=>{
    if (result) {
      new Result(result, '查询成功').success(res)
    } else {
      new Result('查询失败').fail(res)
    }
  }).catch(err=>{
    console.log(err)
  })
})

router.get('/promotion',(req,res)=>{
  promotion().then(result=>{
    if (result) {
      new Result(result, '查询成功').success(res)
    } else {
      new Result('查询失败').fail(res)
    }
  }).catch(err=>{
    console.log(err)
  })
})

router.get('/commodity',(req,res)=>{
  commodity().then(result=>{
    if (result) {
      new Result(result, '查询成功').success(res)
    } else {
      new Result('查询失败').fail(res)
    }
  }).catch(err=>{
    console.log(err)
  })
})

module.exports = router
