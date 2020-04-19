const express = require('express')
const Result = require('../models/Result')
const { UPLOAD_PATH } = require('../utils/constant')
const multer = require('multer')

const router = express.Router()

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${UPLOAD_PATH}/avatar`)
  },
  filename: function (req, file, cb) {
    const filename = Date.now()+'.'+file.mimetype.slice(6)
    cb(null, filename)
  }
})

router.post('/avatar',
  multer({
    storage: storage
  }).single('file'),
  function (req, res) {
    if (!req.file || req.file.length === 0) {
      new Result('上传失败').fail(res)
    }
    else {
      new Result('上传成功').success(res)
    }
  }
)

module.exports = router

