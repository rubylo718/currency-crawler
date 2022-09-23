// Copyright 2018 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// This file is re-write by the sample file from Google
// https://github.com/googleapis/google-api-nodejs-client/blob/main/samples/sheets/quickstart.js

require('dotenv').config()
const { google } = require('googleapis')

const googleController = {
  listMySheet: (auth) => {
    const sheets = google.sheets('v4')
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

}

module.exports = googleController
