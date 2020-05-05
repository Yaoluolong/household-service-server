const { querySql } = require('../mysql');

function login(openid) {
  const sql = `select * from customer where customerID='${openid}'`
  return querySql(sql)
}

function create(openid, avatarUrl, nickName, city) {
  const sql = `insert into customer (\`customerID\`, \`avatar\`, \`nickName\`, \`city\`) 
  VALUES ('${openid}', '${avatarUrl}', '${nickName}', '${city}')`
  return querySql(sql)
}

module.exports={
  login,create
}