const express = require('express')
const Result = require('../models/Result')
const { login, create, update, recommend,hot,news } = require('../service/wechat')
const { PRIVATE_KEY } = require('../utils/constant')
const jwt = require('jsonwebtoken')
const { decode } = require('../utils/decode')

const router = express.Router()

function getToken(data) {
  const token = jwt.sign(
    { data },
    PRIVATE_KEY,
  )
  return token
}

router.post('/login', (req, res) => {
  const { openid } = req.body
  login(openid).then(result => {
    if (result.length !== 0) {
      const token = getToken(result.customerID)
      new Result({ token }, '登录成功').success(res)
    }
    else {
      const { avatarUrl, nickName } = req.body
      create(openid, avatarUrl, nickName).then(answer => {
        if (answer) {
          const token = getToken(openid)
          new Result({ token }, '新增成功').success(res)
        } else {
          new Result('新增失败').fail(res)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }).catch(err => {
    console.log(err)
  })
})

router.post('/update', (req, res) => {
  const { openid, address,name,contact } = req.body
  update(openid, address, name, contact).then(result => {
    if (result) {
      new Result('更新成功').success(res)
    } else {
      new Result('更新失败').fail(res)
    }
  }).catch(err => {
    console.log(err)
  })
})

router.post('/query', (req, res) => {
  const { openid } = req.body
  login(openid).then(result => {
    if (result) {
      new Result(result,'查询成功').success(res)
    } else {
      new Result('查询失败').fail(res)
    }
  }).catch(err => {
    console.log(err)
  })
})

router.get('/index', (req, res) => {
  recommend().then(result => {
    hot().then(result2 => {
      news().then(result3 => {
        const recommendItems=result
        const hotItems=result2
        const newItems=result3
        if (recommendItems && hotItems && newItems) {
        new Result({ recommendItems , hotItems , newItems}, '查询成功').success(res)
        } else {
          new Result('查询失败').fail(res)
        }
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  }).catch(err => {
    console.log(err)
  })
})

module.exports = router
