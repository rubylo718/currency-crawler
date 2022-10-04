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
  await authorize().then(auth => updateGoogleSheet(resultArray, auth)).catch(console.error)
}

authorize().then(getCurrencyTab).catch(console.error)
startCrawler()

app.listen(port, () => {
  console.info(`App is running on port ${port}`)
})
