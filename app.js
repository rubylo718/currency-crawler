require('dotenv').config()
const express = require('express')
const { Builder } = require('selenium-webdriver')
const { getRate } = require('./controllers/getRate-controller')
const { getCurrencyTab, updateGoogleSheet } = require('./controllers/googleSheet-controller')
const lineNotify = require('./controllers/lineNotify')
const authorize = require('./helpers/googleAuth-helper')
const app = express()
const port = 8000

const startCrawler = async () => {
  const driver = await new Builder().forBrowser('chrome').build()
  const resultArray = await getRate(driver)
  driver.quit()
  const auth = await authorize()
  const sheetId = await getCurrencyTab(auth)
  await updateGoogleSheet(sheetId, resultArray, auth)
  lineNotify(resultArray)
}
module.exports.startCrawler = startCrawler

app.listen(port, () => {
  console.info(`App is running on port ${port}`)
})
