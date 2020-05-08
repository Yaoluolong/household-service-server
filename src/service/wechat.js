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

function update(openid, address, name, contact) {
  let sql
  if (address)
    sql = `UPDATE \`customer\` SET \`serviceAddress\`='${address}' WHERE (\`customerID\`='${openid}')`
  else {
    sql = `UPDATE \`customer\` SET \`name\`='${name}', \`contact\`='${contact}' WHERE (\`customerID\`='${openid}')`
  }
  return querySql(sql)
}

function recommend() {
  const sql = `select distinct  commodity.*
  from evaluate
  LEFT JOIN
  \`order\`
  ON
  \`order\`.orderID=evaluate.orderID
  LEFT JOIN
  commodity
  ON
  commodity.commodityID=\`order\`.commodityID
  WHERE
  evaluate.score>=4`
  return querySql(sql)
}

function hot() {
  const sql = `select commodity.*
  from
  \`order\`
  LEFT JOIN
  commodity
  ON
  commodity.commodityID=\`order\`.commodityID
  GROUP BY
  \`order\`.commodityID`
  return querySql(sql)
}

function news() {
  const sql = `SELECT 
  commodity.*,COUNT(\`order\`.commodityID)
  FROM
  commodity
  LEFT JOIN
  \`order\`
  ON
  \`order\`.commodityID=commodity.commodityID
  GROUP BY
  commodity.commodityID
  HAVING
  COUNT(\`order\`.commodityID)<4`
  return querySql(sql)
}

module.exports = {
  login, create, update, recommend, hot, news
}