const express = require('express')
const Result = require('../models/Result')
const { create, list } = require('../service/staff')
const { decode } = require('../utils/decode')
const { increase } = require('../utils/auto-increase')
const { SOURCE_PATH } = require('../utils/constant')

const router = express.Router()

router.post('/create', (req, res) => {
  const decoded = decode(req)
  const { name, sex, entryDate, profile, vocation, age, filename } = req.body
  const picture = `${SOURCE_PATH}/avatar/` + filename
  if (decoded && decoded.username) {
    list().then(result => {
      let data = new Result(result, '查询成功').data
      create(increase(data, 'staffID'), name, sex, entryDate, profile, vocation, age, picture).then(result => {
        if (result) {
          new Result('新增员工成功').success(res)
        } else {
          new Result('新增员工失败').fail(res)
        }
      })
    })
  } else {
    new Result('解析失败').fail(res)
  }
})

router.get('/list', (req, res) => {
  list().then(result => {
    if (result) {
      new Result(result, '查询成功').success(res)
    } else {
      new Result('查询失败').fail(res)
    }
  })
})

module.exports = router
