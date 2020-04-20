const express = require('express')
const Result = require('../models/Result')
const { create, list, update, remove } = require('../service/staff')
const { decode } = require('../utils/decode')
const { increase } = require('../utils/auto-increase')
const { SOURCE_PATH, UPLOAD_PATH } = require('../utils/constant')
const fs = require('fs')

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

router.post('/update', (req, res) => {
  const { staffID, name, sex, entryDate, profile, vocation, age } = req.body
  const { filename } = req.body
  let ori
  let oriFile
  let picture
  if (filename) {
    ori = req.body.ori.split('/').pop()
    oriFile = `${UPLOAD_PATH}/avatar/` + ori
    picture = `${SOURCE_PATH}/avatar/` + filename
  }
  update(staffID, name, sex, entryDate, profile, vocation, age, picture).then(result => {
    if (result) {
      new Result(result, '编辑成功').success(res)
      fs.unlink(oriFile, function (err) {
        if (err) { console.log(err) }
      })
    } else {
      new Result('编辑失败').fail(res)
    }
  })
})

router.post('/remove', (req, res) => {
  const ori = req.body.url.split('/').pop()
  const oriFile = `${UPLOAD_PATH}/avatar/` + ori
  remove(req.body.id).then(result => {
    if (result) {
      new Result('删除成功').success(res)
      fs.unlink(oriFile, function (err) {
        if (err) { throw err }
      })
    } else {
      new Result('删除失败').fail(res)
    }
  })
})

module.exports = router
