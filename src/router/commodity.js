const express = require('express')
const Result = require('../models/Result')
const { create, list, update, remove } = require('../service/commodity')
const { increase } = require('../utils/auto-increase')

const router = express.Router()

router.post('/create', (req, res) => {
  const { name, price, describe } = req.body
  const className = req.body.class
  const show = req.body.show.toString()
  const staffID = req.body.staff.toString()
  list().then(result => {
    const data = new Result(result, '查询成功').data
    create(increase(data, 'commodityID'), name, className, price, show, describe, staffID).then(answer => {
      if (answer) {
        new Result('新增商品成功').success(res)
      } else {
        new Result('新增商品失败').fail(res)
      }
    })
  })
})

module.exports = router