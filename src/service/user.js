const { querySql } = require('../mysql');

function login(username, password) {
  const sql = `select * from user where username='${username}' and password='${password}'`
  return querySql(sql)
}

function findUser(username){
  const sql = `select * from user where username='${username}'`
  return querySql(sql)
}

module.exports = {
  login,
  findUser
}