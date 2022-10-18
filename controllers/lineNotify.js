require('dotenv').config()
const axios = require('axios')
const FormData = require('form-data')
const lineNotifyToken = process.env.LINE_NOTIFY_TOKEN

function lineNotify () {
  const data = new FormData()
  data.append('message', 'test line notify')
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

lineNotify()
