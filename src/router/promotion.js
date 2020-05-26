const express = require('express')
const Result = require('../models/Result')
const { create, list, update, remove, query } = require('../service/promotion')
const { promote } = require('../service/commodity')
const { increase } = require('../utils/auto-increase')
const { SOURCE_PATH, UPLOAD_PATH } = require('../utils/constant')
const fs = require('fs')

const router = express.Router()

router.post('/replace', (req, res) => {
  const filePath = UPLOAD_PATH + '/poster/' + req.body.url
  fs.unlink(filePath, function (err) {
    if (err) {
      console.log(err)
      new Result('移除失败').fail(res)
    }
    else {
      new Result('移除成功').success(res)
    }
  })
})

router.post('/create', (req, res) => {
  const { promotionName, commodityID, promotionPrice, describe } = req.body
  const poster = SOURCE_PATH + '/poster/' + req.body.poster
  list().then(result => {
    let data = new Result(result, '查询成功').data
    create(increase(data, 'promotionID'), promotionName, commodityID, poster, promotionPrice, describe).then(result => {
      if (result) {
        new Result('申请成功').success(res)
      } else {
        new Result('申请失败').fail(res)
      }
    })
  })
})

router.post('/update', (req,res)=> {
  const { id, status,promotionPrice,commodityID } = req.body
  update(id, status).then(result => {
    if (result) {
      if (status==='已激活'){
        promote(promotionPrice, commodityID).then(answer=>{
          if(answer)
            new Result('更新成功').success(res)
          else
            new Result('更新失败').fail(res)
        })
      }else{
        promote(null, commodityID).then(answer => {
          if (answer)
            new Result('更新成功').success(res)
          else
            new Result('更新失败').fail(res)
        })
      }
    } else {
      new Result('更新失败').fail(res)
    }
  })
})

router.post('/remove',(req,res)=>{
  remove(req.body.id).then(result => {
    if (result) {
      new Result('移除成功').success(res)
    } else {
      new Result('移除失败').fail(res)
    }
  })
})

router.post('/query', (req, res) => {
  query(req.body.id).then(result => {
    if (result) {
      new Result(result,'查询成功').success(res)
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

module.exports = router