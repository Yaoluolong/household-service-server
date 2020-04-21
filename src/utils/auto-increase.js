function increase(data, id) {
  if (data && Array.isArray(data)) {
    let i = 3
    for (i = 1; i <= 100; i++) {
      if (data.every(e => +e[id] !== i)) {
        break
      }
    }
    if (i < 10) {
      return ('00' + i)
    }
    else {
      return ('0' + i)
    }
  }
  else if (!data) {
    return ('001')
  }
  else {
    let i
    for (i = 1; i <= 100; i++) {
      if (i !== +data[id]) {
        break
      }
    }
    if (i < 10) {
      return ('00' + i)
    }
    else {
      return ('0' + i)
    }
  }
}

module.exports = {
  increase
}