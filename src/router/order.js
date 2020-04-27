const express = require('express')
const Result = require('../models/Result')
const { create, list, update, remove } = require('../service/order')
const { increase } = require('../utils/auto-increase')

const router = express.Router()

router.get('/list', (req, res) => {
  list().then(result => {
    if (result) {
      new Result(result, '查询成功').success(res)
    } else {
      new Result('查询失败').fail(res)
    }
  })
})

router.post('/update',(req,res)=>{
  update(req.body.status).then(result=>{
    if (result) {
      new Result('修改成功').success(res)
    } else {
      new Result('修改失败').fail(res)
    }
  })
})

module.exports = router