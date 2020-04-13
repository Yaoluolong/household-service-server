const mysql = require('mysql')
const { host, user, password, database } = require('./config')
const { debug } = require('../utils/constant')

function connect() {
  return mysql.createConnection({
    host,
    user,
    password,
    database,
    multipleStatements: true
  })
}

function querySql(sql) {
  const conn = connect()
  if(debug)
    console.log(sql)
  return new Promise((resolve, reject) => {
    try {
      conn.query(sql, (err, results) => {
        if (err) {
          if(debug)
            console.log('查询失败，原因:' + JSON.stringify(err))
          reject(err)
        } else {
          if(debug)
            console.log('查询成功', JSON.stringify(results))
          if(results&&results.length===1)
            resolve(results[0])
          else
            resolve(results)
        }
      })
    } catch (e) {
      reject(e)
    } finally {
      conn.end()
    }
  })
}


module.exports = {
  querySql
}