const { getSheetTabs, addTab, appendRows } = require('../helpers/googleAPI-helper')

const currencyPathList = require('../paths/currencyPathList.json')
const currencies = currencyPathList.currencies

const getCurrencyTab = async (auth) => {
  const currencyTab = { title: 'currency', id: null }
  const onlineTabs = await getSheetTabs(auth)
  onlineTabs.forEach(tab => {
    if (tab.properties.title === currencyTab.title) {
      // if tab "currency" existed, use the sheet id
      console.log('tab existed')
      currencyTab.id = tab.properties.sheetId
    }
  })
  if (currencyTab.id === null) {
    // if tab "currency" is not existed, create one
    console.log(`tab "${currencyTab.title}" is not existed`)
    try {
      currencyTab.id = await addTab(currencyTab.title, auth)
      const currencyNameArray = ['牌價時間']
      for (const currency of currencies) {
        currencyNameArray.push(currency.name)
      }
      await appendRows(currencyNameArray, auth)
      console.log('new tab created')
    } catch (error) {
      console.log('error', error)
    }
  }
  return currencyTab
}

const updateGoogleSheet = async (resultArray, auth) => {
  try {
    await appendRows(resultArray, auth)
  } catch (error) {
    console.log('error', error)
  }
}

module.exports = {
  getCurrencyTab,
  updateGoogleSheet
}
