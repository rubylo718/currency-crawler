require('dotenv').config()
const express = require('express')
const { Builder } = require('selenium-webdriver')
const { getRate } = require('./controllers/getRate-controller')
const { getCurrencyTab, updateGoogleSheet } = require('./controllers/googleSheet-controller')
const authorize = require('./helpers/googleAuth-helper')
const app = express()
const port = process.env.PORT || 8000

async function startCrawler () {
  const driver = await new Builder().forBrowser('chrome').build()
  const resultArray = await getRate(driver)
  driver.quit()
  return resultArray
}

async function start () {
  const resultArray = await startCrawler()
  const auth = await authorize()
  const sheetId = await getCurrencyTab(auth)
  await updateGoogleSheet(sheetId, resultArray, auth)
}

start()

app.listen(port, () => {
  console.info(`App is running on port ${port}`)
})
