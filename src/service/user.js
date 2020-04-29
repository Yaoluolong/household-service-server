const { querySql } = require('../mysql');

function login(username, password) {
  const sql = `select * from user where username='${username}' and password='${password}'`
  return querySql(sql)
}

function findUser(username) {
  const sql = `select * from user where username='${username}'`
  return querySql(sql)
}

function create(username, password) {
  const sql = `INSERT INTO \`user\` (\`username\`, \`password\`, \`role\`, \`avatar\`) VALUES ('${username}', '${password}', 'guest', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')`
  return querySql(sql)
}

function list() {
  const sql = 'select * from \`user\`'
  return querySql(sql)
}

function update(username, password, role) {
  let sql
  if (role)
    sql = `update user set role='${role}' where username='${username}'`
  else
    sql = `update user set password='${password}' where username='${username}'`
  return querySql(sql)
}

module.exports = {
  login,
  findUser,
  create,
  list,
  update
}