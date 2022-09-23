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
const express = require('express')
const opn = require('open')
const path = require('path')
const fs = require('fs')

const keyfile = path.join(__dirname, 'credentials.json')
const keys = JSON.parse(fs.readFileSync(keyfile))
const scopes = ['https://www.googleapis.com/auth/spreadsheets']

const googleController = require('../../controllers/googleSheet-controller')

// Create an oAuth2 client to authorize the API call
const client = new google.auth.OAuth2(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[0]
)

// Generate the url that will be used for authorization
this.authorizeUrl = client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
})

// Open an http server to accept the oauth callback. In this
// simple example, the only request to our webserver is to
// /oauth2callback?code=<code>
const app = express()
app.get('/oauth2callback', (req, res) => {
  const code = req.query.code
  client.getToken(code, (err, tokens) => {
    if (err) {
      console.error('Error getting oAuth tokens:')
      throw err
    }
    client.credentials = tokens
    res.send('Authentication successful! Please return to the console.')
    server.close()
    // googleController.listMySheet(client)
    // googleController.getSheetTabs(client)
    getCurrencyTab(client)
  })
})

async function getCurrencyTab (auth) {
  const currencyTab = { title: 'currency', id: null }
  const onlineTabs = await googleController.getSheetTabs(auth)
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
      currencyTab.id = await googleController.addTab(currencyTab.title, auth)
    } catch (error) {
      console.log('error', error)
    }
  }
  return currencyTab
}

const server = app.listen(3000, () => {
  // open the browser to the authorize url to start the workflow
  opn(this.authorizeUrl, { wait: false })
})
