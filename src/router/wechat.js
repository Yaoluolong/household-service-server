const express = require('express')
const Result = require('../models/Result')
const { login, create } = require('../service/wechat')
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
    if (result.length!==0) {
      const token = getToken(result.customerID)
      new Result({ token }, '登录成功').success(res)
    }
    else {
      const { avatarUrl, nickName, city } = req.body
      create(openid, avatarUrl, nickName, city).then(answer => {
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

module.exports = router
