const { By } = require('selenium-webdriver')

const currencyPathList = require('../paths/currencyPathList.json')
const website = currencyPathList.url
const currencies = currencyPathList.currencies

const getRate = {
  getRate: async (driver) => {
    const resultArray = []
    /*
    resultArray example: ["2022/9/25 14:00", "31.4", "0.221", "31.3"]
    */
    try {
      await driver.get(website)
      await driver.sleep(1000)
      const quotedDate = await driver.findElements(By.xpath(currencyPathList.quotedDateXpath))
      for (const date of quotedDate) {
        const timeText = await date.getText()
        console.log(`牌價時間: ${timeText}`)
        resultArray.push(timeText)
      }
      for (const currency of currencies) {
        const data = await driver.findElements(By.xpath(currency.xpath))
        for (const item of data) {
          const text = await item.getText()
          const currencyName = currency.name
          console.log(`${currencyName} 即期賣出匯率: ${text}`)
          resultArray.push(text)
        }
      }
      return resultArray
    } catch (error) {
      console.log('Error!', error)
    }
  }
}

module.exports = getRate
