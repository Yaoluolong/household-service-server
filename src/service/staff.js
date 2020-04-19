const { querySql } = require('../mysql');

function create(staffID, name, sex, entryDate, profile, vocation, age, picture) {
  const sql = `insert into staff(staffID,name,sex,entryDate,profile,vocation,age,picture) 
  values('${staffID}','${name}','${sex}','${entryDate}','${profile}','${vocation}','${age}','${picture}')`
  return querySql(sql)
}

function list(staffID) {
  let sql
  if (staffID) {
    sql = `select * from staff where staffID='${staffID}'`
  } else {
    sql = `select * from staff`
  }
  return querySql(sql)
}

module.exports = {
  create,
  list
}