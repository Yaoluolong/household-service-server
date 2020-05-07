const express = require('express')
const moment = require('moment')
const Result = require('../models/Result')
const { query, list, update, order, create } = require('../service/order')
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

router.post('/order', (req, res) => {
  const { commodityID, openid } = req.body
  order(commodityID, openid).then(result => {
    if (result) {
      new Result(result, '查询成功').success(res)
    } else {
      new Result('查询失败').fail(res)
    }
  })
})

router.post('/create', (req, res) => {
  const orderID = new Date().getTime()
  const orderDate = moment(orderID).format('YYYY-MM-DD')
  create(orderID, orderDate, req.body).then(result => {
    if (result) {
      new Result(result, '新增成功').success(res)
    } else {
      new Result('新增失败').fail(res)
    }
  })
})

router.post('/query', (req, res) => {
  query(req.body.id).then(result => {
    if (result) {
      new Result(result, '查询成功').success(res)
    } else {
      new Result('查询失败').fail(res)
    }
  })
})

router.post('/update', (req, res) => {
  update(req.body.id, req.body.status).then(result => {
    if (result) {
      new Result('修改成功').success(res)
    } else {
      new Result('修改失败').fail(res)
    }
  })
})

module.exports = router