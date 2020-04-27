const { querySql } = require('../mysql');

function list() {
  const sql = `
  SELECT
	\`order\`.*, customer.\`name\` AS customerName,
	commodity.\`name\` AS commodityName,
	commodity.className ,
	commodity.price
  FROM
	\`order\`
  LEFT JOIN commodity ON \`order\`.commodityID = \`commodity\`.commodityID
  LEFT JOIN customer ON \`order\`.customerID = customer.customerID
  `
  return querySql(sql)
}

function update(status){
  const sql = `update \`order\` set status='${status}'`
  return querySql(sql)
}

module.exports = {
  list, update
}