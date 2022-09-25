require('dotenv').config()
const express = require('express')
const { Builder } = require('selenium-webdriver')
const { getRate } = require('./controllers/getRate-controller')
const getCurrencyTab = require('./controllers/googleSheet-controller')
const authorize = require('./helpers/googleAuth-helper')
const app = express()
const port = process.env.PORT || 8000

async function startCrawler () {
  const driver = await new Builder().forBrowser('chrome').build()
  await getRate(driver)
  driver.quit()
}

// startCrawler()
authorize().then(getCurrencyTab).catch(console.error)

app.listen(port, () => {
  console.info(`App is running on port ${port}`)
})
