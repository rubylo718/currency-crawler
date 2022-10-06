require('dotenv').config()
const { startCrawler } = require('./app')
const CronJob = require('cron').CronJob

const job = new CronJob({
  cronTime: process.env.CRONJOB_TIME,
  onTick: async function () {
    console.log(`crawler starts: ${new Date()}`)
    await startCrawler()
    console.log('crawler completed')
  },
  start: true,
  timeZone: 'Asia/Taipei'
})
job.start()
