const { querySql } = require('../mysql');

function create(promotionID, promotionName, commodityID, poster, promotionPrice, describe) {
  const sql = `insert into promotion(promotionID,promotionName,commodityID,poster,promotionPrice,\`describe\`,status) 
  values('${promotionID}','${promotionName}','${commodityID}','${poster}','${promotionPrice}','${describe}','待审核')`
  return querySql(sql)
}

function list() {
  const sql = `select promotion.*,commodity.name  from promotion
  LEFT JOIN
  commodity
  ON
  promotion.commodityID=commodity.commodityID`
  return querySql(sql)
}

function update(id, status) {
  const sql = `update promotion set status='${status}' where promotionID='${id}'`
  return querySql(sql)
}

function remove(id) {
  const sql = `delete from promotion where promotionID='${id}'`
  return querySql(sql)
}

module.exports = {
  create, list, update, remove
}