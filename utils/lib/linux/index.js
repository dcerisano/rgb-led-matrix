const Promise = require('pinkie-promise')
const exec = require('child_process').exec

function linuxSnapshot () {
  return new Promise((resolve, reject) => {
    exec('import -silent -window root -resize 5%x5%  -quality 0 jpeg:- ', {
      encoding: 'buffer',
      maxBuffer: 1024 * 1000
    }, (err, stdout) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(stdout)
      }
    })
  })
}

module.exports = linuxSnapshot
