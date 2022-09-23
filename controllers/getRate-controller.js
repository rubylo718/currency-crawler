const { By } = require('selenium-webdriver')

// 台灣銀行牌告匯率網站
const web = 'https://rate.bot.com.tw/xrt?Lang=zh-TW'
// USD spot selling rate(即期賣出匯率)xpath
const path = '//*[@id="ie11andabove"]/div/table/tbody/tr[1]/td[5]'

const getRate = {
  getRate: async (driver) => {
    try {
      await driver.get(web)
      await driver.sleep(1000)
      const data = await driver.findElements(By.xpath(path))
      for (const item of data) {
        const text = await item.getText()
        console.log(text)
      }
    } catch (error) {
      console.log('Error!', error)
    }
  }
}

module.exports = getRate
