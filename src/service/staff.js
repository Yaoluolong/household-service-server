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

function update(staffID, name, sex, entryDate, profile, vocation, age, picture) {
  if (picture) {
    const sql = `update staff set 
    name='${name}', sex='${sex}', entryDate='${entryDate}', profile='${profile}', vocation='${vocation}', age='${age}', picture='${picture}'
    where staffID='${staffID}'`
    return querySql(sql)
  }
  else {
    const sql = `update staff set 
    name='${name}', sex='${sex}', entryDate='${entryDate}', profile='${profile}', vocation='${vocation}', age='${age}'
    where staffID='${staffID}'`
    return querySql(sql)
  }
}

function remove(staffID) {
  const sql = `DELETE FROM staff WHERE staffID='${staffID}'`
  return querySql(sql)
}

function query(staffID){
const sql = `select * from staff where staffID='${staffID}'`
  return querySql(sql)
}
module.exports = {
  create,
  list,
  query,
  update,
  remove
}