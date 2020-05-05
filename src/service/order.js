const { querySql } = require('../mysql');

function list() {
  const sql = `
  SELECT
	*
  FROM
	\`order\`
  `
  return querySql(sql)
}

function update(id,status) {
  const sql = `update \`order\` set status='${status}' where orderID='${id}'`
  return querySql(sql)
}

function query(id) {
  const sql = `select * from \`order\` where customerID='${id}'`
  return querySql(sql)
}

module.exports = {
  list, update, query
}