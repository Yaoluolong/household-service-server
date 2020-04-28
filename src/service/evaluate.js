const { querySql } = require('../mysql');

function list() {
  const sql = `select evaluate.*,commodity.\`name\` as commodityName,commodity.className,customer.\`name\` as customerName
        from evaluate
        LEFT JOIN
        \`order\`
        ON
        evaluate.orderID=\`order\`.orderID
        LEFT JOIN
        commodity
        ON
        commodity.commodityID=\`order\`.commodityID
        LEFT JOIN
        customer
        ON
        evaluate.customerID=customer.customerID`
  return querySql(sql)
}

function update(id,feedback){
  const sql = `update evaluate set feedback='${feedback}' where evaluateID='${id}'`
  return querySql(sql)
}

module.exports={
  list,update
}