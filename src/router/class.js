const Result = require('../models/Result')
const express = require('express')
const { list } = require('../service/class')

const router = express.Router()

router.get('/list', (req, res) => {
  list().then(result => {
    if (result) {
      new Result(result,'查询成功').success(res)
    }
    else
      new Result('查询失败').fail(res)

  })
})

module.exports=router