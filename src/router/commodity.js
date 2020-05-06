const express = require('express')
const Result = require('../models/Result')
const { create, list, update, remove, sort, query } = require('../service/commodity')
const { increase } = require('../utils/auto-increase')
const { UPLOAD_PATH } = require('../utils/constant')
const fs = require('fs')
const router = express.Router()

router.post('/remove', (req, res) => {
  console.log(req.body)
  const files = req.body.files
  const oriPath = `${UPLOAD_PATH}/show/`
  remove(req.body.id).then(result => {
    if (result) {
      files.forEach(val => {
        const filename = val.split('/').pop()
        fs.unlink(oriPath + filename, function (err) {
          if (err) { throw err }
        })
      })
      new Result('删除商品成功').success(res)
    } else {
      new Result('删除商品失败').fail(res)
    }
  })
})

router.post('/update', (req, res) => {
  const { commodityID, describe, name, isRemoved, price, show } = req.body
  const className = req.body.class
  const staffID = req.body.staff.toString()
  const oriPath = `${UPLOAD_PATH}/show/`
  update(commodityID, name, className, price, show, describe, staffID).then(result => {
    if (result) {
      new Result('更新商品成功').success(res)
      if (isRemoved.length !== 0) {
        isRemoved.forEach(val => {
          fs.unlink(oriPath + val, function (err) {
            if (err) { console.log(err) }
          })
        })
      }
    } else {
      new Result('更新商品失败').fail(res)
    }
  })
})

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

router.post('/sort', (req, res) => {
  sort(req.body.className).then(result => {
    if (result) {
      new Result(result, '查询成功').success(res)
    } else {
      new Result('查询失败').fail(res)
    }
  })
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

router.post('/query', (req, res) => {
  query(req.body.id).then(result => {
    if (result) {
      new Result(result, '查询成功').success(res)
    } else {
      new Result('查询失败').fail(res)
    }
  })
})

module.exports = router