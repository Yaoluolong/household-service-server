const { querySql } = require('../mysql');

function staff() {
  const sql = 'SELECT COUNT(*) as count  FROM staff'
  return querySql(sql)
}

function evaluate() {
  const sql = `SELECT COUNT(*) as count FROM evaluate WHERE feedback='' or feedback=NULL`
  return querySql(sql)
}

function promotion() {
  const sql = `SELECT COUNT(*) as count FROM promotion WHERE \`status\`='已激活'`
  return querySql(sql)
}


function commodity() {
  const sql = 'select COUNT(*) as count from commodity'
  return querySql(sql)
}


module.exports = {
  staff, evaluate, promotion, commodity
}
