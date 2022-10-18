require('dotenv').config()
const axios = require('axios')
const FormData = require('form-data')
const lineNotifyToken = process.env.LINE_NOTIFY_TOKEN

function lineNotify (resultArray) {
  const data = new FormData()
  const msg = resultToMsg(resultArray)
  data.append('message', msg)
  data.append('stickerPackageId', 11537)
  data.append('stickerId', 52002736)

  const headers = Object.assign({
    Authorization: `Bearer ${lineNotifyToken}`
  }, data.getHeaders())

  axios({
    method: 'post',
    url: 'https://notify-api.line.me/api/notify',
    data,
    headers
  }).then(res => {
    console.log(res.data)
  }).catch(err => {
    console.error(err)
    console.error('status: ' + err.res.status)
  })
}

function resultToMsg (array) {
  /*
  resultArray example: ["2022/9/25 14:00", "31.4", "0.221", "31.3"]
  */
  const msg = '\n牌價時間: ' + array[0] + '\nUSD 美金 即期賣出: ' + array[1] + '\nJPY 日圓 即期賣出: ' + array[2] + '\nEUR 歐元 即期賣出: ' + array[3]
  return msg
}

module.exports = lineNotify
