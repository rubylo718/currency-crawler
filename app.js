require('dotenv').config()
const express = require('express')
const { Builder } = require('selenium-webdriver')
const { getRate } = require('./controllers/getRate-controller')
const app = express()
const port = process.env.PORT || 3000

async function startCrawler () {
  const driver = await new Builder().forBrowser('chrome').build()
  await getRate(driver)
  driver.quit()
}

startCrawler()

app.listen(port, () => {
  console.info(`App is running on port ${port}`)
})
