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

function update(id, status) {
  const sql = `update \`order\` set status='${status}' where orderID='${id}'`
  return querySql(sql)
}

function query(id) {
  const sql = `select * from \`order\` where customerID='${id}'`
  return querySql(sql)
}

function create(orderID, orderDate, data) {
  let amount='0'
  if (data.promotionPrice === '' || data.promotionPrice === null){
    amount=data.price
  }else{
    amount = data.promotionPrice
  }
  const sql = `INSERT INTO \`household\`.\`order\` 
  (\`orderID\`, \`orderDate\`, \`serviceDate\`, \`commodityID\`, \`customerID\`, \`serviceAddress\`, \`contact\`, \`amount\`, \`status\`, \`staffID\`, \`commodityAvatar\`, \`commodityName\`, \`className\`, \`customerName\`) 
  VALUES 
  ('${orderID}', '${orderDate}', '${data.serviceDate}', '${data.commodityID}', '${data.customerID}', '${data.serviceAddress}', '${data.contact}', '${amount}', '${data.status}', '${data.staffID}', '${data.avatar}', '${data.commodityName}', '${data.className}', '${data.name}');`
  return querySql(sql)
}

function order(commodityID, openid) {
  const sql = `select *,commodity.name as commodityName from commodity,customer
              WHERE
              commodityID='${commodityID}'
              AND
              customerID='${openid}'`
  return querySql(sql)
}

module.exports = {
  list, update, query, order, create
}