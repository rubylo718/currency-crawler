require('dotenv').config()
const { google } = require('googleapis')
const sheets = google.sheets('v4')

const listMySheet = (auth) => {
  const tabTitle = 'hello'
  sheets.spreadsheets.values.get(
    {
      auth,
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `${tabTitle}!A:E`
    },
    (err, res) => {
      if (err) {
        console.error('The API returned an error.')
        throw err
      }
      const rows = res.data.values
      if (rows.length === 0) {
        console.log('No data found.')
      } else {
        console.log('ok', rows)
      }
    }
  )
}
const getSheetTabs = async (auth) => {
  const request = {
    spreadsheetId: process.env.SPREADSHEET_ID,
    ranges: [],
    includeGridData: false,
    auth
  }
  try {
    const response = (await sheets.spreadsheets.get(request)).data
    const sheetInfo = response.sheets
    return sheetInfo
  } catch (err) {
    console.error('error', err)
  }
}
const addTab = async (title, auth) => {
  const request = {
    spreadsheetId: process.env.SPREADSHEET_ID,
    resource: {
      requests: [
        {
          addSheet: {
            properties: {
              title
            }
          }
        }
      ]
    },
    auth
  }
  try {
    const response = (await sheets.spreadsheets.batchUpdate(request)).data
    const sheetId = response.replies[0].addSheet.properties.sheetId
    console.log(`new tab added. name: ${title}, id: ${sheetId}`)
    return sheetId
  } catch (err) {
    console.error('error', err)
  }
}

const appendRows = async (array, auth) => {
  const request = {
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'currency',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      majorDimension: 'ROWS',
      range: 'currency',
      values: [array]
    },
    auth
  }
  try {
    const response = (await sheets.spreadsheets.values.append(request)).data
    const updatedRange = response.updates.updatedRange
    console.log(`updated ${updatedRange}`)
  } catch (err) {
    console.error('error', err)
  }
}

module.exports = {
  listMySheet,
  getSheetTabs,
  addTab,
  appendRows
}
