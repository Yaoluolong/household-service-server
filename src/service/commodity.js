const { querySql } = require('../mysql');

function create(commodityID,name, className, price, show, describe, staffID) {
  const sql = `insert into commodity(commodityID,\`name\`,class,price,\`show\`,\`describe\`,staffID) 
  values('${commodityID}','${name}','${className}','${price}','${show}','${describe}','${staffID}')`
  return querySql(sql)
}

function list() {
  const sql = 'select * from commodity'
  return querySql(sql)
}

module.exports = {
  create, list
}