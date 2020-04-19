const UPLOAD_PATH ='C:/Users/yao/upload/household-service'
const SOURCE_PATH ='https://yaoluolong.xyz:8088/household-service'

module.exports = {
  CODE_ERROR: -1,              //错误状态码
  CODE_SUCCESS: 0,             //成功状态码
  CODE_TOKEN_EXPIRED: -2 ,     //token已过期
  debug: false,                //debug模式开关
  PWD_SALT: 'yaoluolong',      //MD5加密密钥
  PRIVATE_KEY: 'yaoluolong',   //JWT密钥
  JWT_EXPIRED: 60*60*2,        //token失效时间
  UPLOAD_PATH,                 //照片上传路径
  SOURCE_PATH                  //资源服务器地址      
}