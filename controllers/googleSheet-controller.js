const { getSheetTabs, addTab, insertRow, writeRow } = require('../helpers/googleAPI-helper')

const currencyPathList = require('../paths/currencyPathList.json')
const currencies = currencyPathList.currencies

const getCurrencyTab = async (auth) => {
  const currencyTab = { title: 'currency', id: null }
  const onlineTabs = await getSheetTabs(auth)
  onlineTabs.forEach(tab => {
    if (tab.properties.title === currencyTab.title) {
      // if tab "currency" existed, use the sheet id
      currencyTab.id = tab.properties.sheetId
      console.log(`tab existed id: ${currencyTab.id}`)
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
      await writeRow(currencyNameArray, auth)
      console.log('new tab created')
    } catch (error) {
      console.log('error', error)
    }
  }
  return currencyTab.id
}

const updateGoogleSheet = async (sheetId, resultArray, auth) => {
  try {
    await insertRow(sheetId, auth)
    await writeRow(resultArray, auth)
  } catch (error) {
    console.log('error', error)
  }
}

module.exports = {
  getCurrencyTab,
  updateGoogleSheet
}
