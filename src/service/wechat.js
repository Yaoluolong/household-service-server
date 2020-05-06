const { querySql } = require('../mysql');

function login(openid) {
  const sql = `select * from customer where customerID='${openid}'`
  return querySql(sql)
}

function create(openid, avatarUrl, nickName) {
  const sql = `insert into customer (\`customerID\`, \`avatar\`, \`nickName\`) 
  VALUES ('${openid}', '${avatarUrl}', '${nickName}')`
  return querySql(sql)
}

function update(openid,address) {
  const sql = `UPDATE \`customer\` SET \`serviceAddress\`='${address}' WHERE (\`customerID\`='${openid}')`
  return querySql(sql)
} 

module.exports={
  login, create, update
}