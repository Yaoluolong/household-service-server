const { querySql } = require('../mysql');

function list() {
  const sql = 'select * from class'
  return querySql(sql)
}

module.exports={
  list
}