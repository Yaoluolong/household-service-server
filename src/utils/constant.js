module.exports = {
  CODE_ERROR: -1,              //错误状态码
  CODE_SUCCESS: 0,             //成功状态码
  CODE_TOKEN_EXPIRED: -2 ,     //token已过期
  debug: false,                //debug模式开关
  PWD_SALT: 'yaoluolong',      //MD5加密密钥
  PRIVATE_KEY: 'yaoluolong',   //JWT密钥
  JWT_EXPIRED: 60 * 60,        //token失效时间
}