# Javascript 匯率爬蟲小工具

![jscrawler-demo](/public/photos/jscrawler-demo.gif)

## Introduction
本專案以 Node.js 為基礎，使用爬蟲工具 selenium-webdriver，取得銀行網頁上所需要的匯率資訊，運行後將所獲取的資訊自動存入 Google Sheet 中，並透過 Line Notify 通知結果。另外也包含自動化排程、與背景執行功能。

此專案概念，參考第12屆iThome鐵人賽-行銷廣告、電商小編的武器，FB & IG爬蟲專案從零開始[系列文章](https://ithelp.ithome.com.tw/users/20103256/ironman/2940)。更詳細的內容，歡迎閱讀[專案介紹](https://rubylo718.github.io/2022/11/06/JScrawler-1/)、以及[專案心得與反思](https://rubylo718.github.io/2022/11/06/JScrawler-2/)。

---
## How to Use 
### Clone Repo 
```
$ git clone https://github.com/rubylo718/currency-crawler.git `
```

### Install Dependencies
```
$ cd currency-crawler
$ npm install
```

### Install Chrome (if you do not have)
這個專案使用 Chrome Driver，需要有 Chrome 瀏覽器。

### Add Chrome Driver
請依照使用者的 Chrome 瀏覽器版本（版本請於瀏覽器中 "關於 Google Chrome" 確認），至 [Chrome driver downloads](https://chromedriver.chromium.org/downloads) 下載對應版本之 driver，放至專案根目錄中。

### Add `.env` file
```
SPREADSHEET_ID='your google spreadsheet id'
LINE_NOTIFY_TOKEN='your line notify token'
CRONJOB_TIME='* * * * * *'
```
說明：
1. 操作 Google Sheet 需要憑證，須先至 Google Cloud Project 建立新專案並取得 token，請參考[官方文件](https://developers.google.com/sheets/api/quickstart/nodejs)。

2. 使用 Line Notify 功能須至 Line 取得存取 token，請至[官方網站](https://notify-bot.line.me/zh_TW/)。

3. CRONJOB_TIME 是設定自動執行排程的時間參數。例如：`'0 10,15 * * 1-5'` 是每週一至週五，10 點 0 分與 15 點 0 分時執行。Cron 時間參數寫法，可以使用 [crontab.guru](https://crontab.guru/) 這個網站，很有幫助 👍

---
## Getting Started
一次性執行：

```
npm run start
```

依照所設定的排程執行：

```
npm run schedule
```

伺服器會在 http://localhost:8000/ 的位置運行。

下圖為 `npm run schedule` 在上午 10:10 自動運行之結果：


![result](/public/photos/result.png)

---
## Built with

- Runtime Environment: Node.js @16.14.2
- Framework: Express @4.18.1
- Crawler tool: selenium-webdriver @4.4.0
- Data storage: Google sheet via googleapis @105.0.0
- Scheduling: Cron @2.1.0
- Background process: pm2 @5.2.2

---
## License
Licensed under the MIT License, Copyright © 2022-present Ruby Lo

