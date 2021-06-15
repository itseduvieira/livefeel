'use strict'

const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

;(async () => {
  const videoId = process.argv.slice(2)[0]

  const browser = await puppeteer.launch({
    headless: false
  })

  const page = await browser.newPage()

  await page.goto(`https://www.youtube.com/live_chat?v=${videoId}`)

  const content = await page.content()

  const $ = cheerio.load(content)

  const messages = $('#item-offset > #items').children()

  // messages.slice(0, 50).each((i, e) => {
  //   console.log($($(e).find('#content').children()[2]).text())
  // })

  messages.each((i, e) => {
    console.log(i, ' - ', $($(e).find('#content').children()[2]).text())
  })

  // console.log($($(messages[0]).find('#content').children()[2]).text())
  // console.log($($(messages[messages.length - 2]).find('#content').children()[2]).text())

  browser.close()
})()