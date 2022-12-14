require('dotenv').config()
const { google } = require('googleapis')
const sheets = google.sheets('v4')

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
              title,
              gridProperties: {
                frozenRowCount: 1
              }
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
    return sheetId
  } catch (err) {
    console.error('error', err)
  }
}

const appendRow = async (array, auth) => {
  const request = {
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'currency',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'OVERWRITE',
    resource: {
      majorDimension: 'ROWS',
      range: 'currency',
      values: [array]
    },
    auth
  }
  try {
    await sheets.spreadsheets.values.append(request).data
  } catch (err) {
    console.error('error', err)
  }
}

const insertRow = async (sheetId, auth) => {
  const request = {
    spreadsheetId: process.env.SPREADSHEET_ID,
    resource: {
      requests: [
        {
          updateDimensionProperties: {
            range: {
              sheetId,
              dimension: 'COLUMNS',
              startIndex: 0,
              endIndex: 1
            },
            properties: {
              pixelSize: 120
            },
            fields: 'pixelSize'
          }
        },
        {
          insertDimension: {
            range: {
              sheetId,
              dimension: 'ROWS',
              startIndex: 1,
              endIndex: 2
            },
            inheritFromBefore: false
          }
        }
      ]
    },
    auth
  }
  try {
    await sheets.spreadsheets.batchUpdate(request)
  } catch (err) {
    console.error('error', err)
  }
}

const writeRowTwo = async (array, auth) => {
  const request = {
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'currency!2:2',
    valueInputOption: 'USER_ENTERED',
    resource: {
      majorDimension: 'ROWS',
      values: [array]
    },
    auth
  }
  try {
    await sheets.spreadsheets.values.update(request).data
  } catch (err) {
    console.error('error', err)
  }
}

module.exports = {
  getSheetTabs,
  addTab,
  appendRow,
  insertRow,
  writeRowTwo
}
