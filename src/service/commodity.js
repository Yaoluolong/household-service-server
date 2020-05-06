const { querySql } = require('../mysql');

function create(commodityID, name, className, price, show, describe, staffID) {
  const sql = `insert into commodity(commodityID,\`name\`,className,price,\`show\`,\`describe\`,staffID) 
  values('${commodityID}','${name}','${className}','${price}','${show}','${describe}','${staffID}')`
  return querySql(sql)
}

function list() {
  const sql = 'select * from commodity'
  return querySql(sql)
}

function sort(className) {
  const sql = `select * from commodity where className='${className}'`
  return querySql(sql)
}

function remove(commodityID) {
  const sql = `DELETE FROM commodity WHERE commodityID='${commodityID}'`
  return querySql(sql)
}

function query(id) {
  const sql = `select * from commodity where commodityID='${id}'`
  return querySql(sql)
}

function update(commodityID, name, className, price, show, describe, staffID) {
  const sql = `update commodity set 
    \`name\`='${name}', className='${className}', price='${price}', \`describe\`='${describe}', staffID='${staffID}',\`show\`='${show.toString()}'
    where commodityID='${commodityID}'`
  return querySql(sql)
}

module.exports = {
  create, list, remove, update, sort, query
}