const express = require('express')
const Result = require('../models/Result')
const { create, list, update, querylist} = require('../service/evaluate')
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

router.post('/querylist', (req, res) => {
  querylist(req.body.commodityID).then(result => {
    if (result) {
      new Result(result, '查询成功').success(res)
    } else {
      new Result('查询失败').fail(res)
    }
  })
})

router.post('/update', (req, res) => {
  update(req.body.id, req.body.feedback).then(result => {
    if (result) {
      new Result('更新成功').success(res)
    } else {
      new Result('更新失败').fail(res)
    }
  })
})

router.post('/create', (req, res) => {
  const { id, openid, score, evaluate } = req.body
  create(id, openid, score, evaluate).then(result => {
    if (result) {
      new Result('新增成功').success(res)
    } else {
      new Result('新增失败').fail(res)
    }
  })
})

module.exports = router