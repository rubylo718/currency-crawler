const { By } = require('selenium-webdriver')

const currencyPathList = require('../paths/currencyPathList.json')
const website = currencyPathList.url
const currencies = currencyPathList.currencies

const getRate = {
  getRate: async (driver) => {
    try {
      await driver.get(website)
      await driver.sleep(1000)
      for (const currency of currencies) {
        const data = await driver.findElements(By.xpath(currency.xpath))
        for (const item of data) {
          const text = await item.getText()
          const currencyName = currency.name
          console.log(`${currencyName} 即期賣出匯率: ${text}`)
        }
      }
    } catch (error) {
      console.log('Error!', error)
    }
  }
}

module.exports = getRate
