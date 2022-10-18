# Javascript匯率爬蟲小工具
這是一個自主練習專案。

## Target
使用爬蟲工具selenium-webdriver，取得銀行網頁上所需要的匯率資訊，將資訊自動存入Google Sheet中，加上自動化排程、背景執行、以及Line Notify通知資訊與結果。

## Getting Started
一次性執行爬蟲

`npm run start`

依照所設定的排程執行爬蟲

`npm run schedule`

## Main Packages

Runtime Environment: Node.js @16.14.2

Framework: Express @4.18.1

Crawler tool: selenium-webdriver @4.4.0

Data storage: Google sheet via googleapis @105.0.0

Scheduling: Cron @2.1.0

Background process: pm2 @5.2.2

## Author

Ruby Lo