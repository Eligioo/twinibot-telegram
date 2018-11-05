require('dotenv').config()
const Telegraf = require('telegraf')
const fetch = require("node-fetch")
const command_list = 'live - Show a list of online streamers'

const bot = new Telegraf(process.env.TELEGRAM_KEY, {username: process.env.TELEGRAM_USERNAME})

const buildStreamers = (body) => {
    let streamersInfo = ``
    streamersInfo += `Streamers online: ${body.total_online} / ${body.total_twini_channels}\n\n`
    body.streams.forEach(element => {
        streamersInfo += `👤 ${element.channel.display_name} | 👀 ${element.viewers} viewers | 🎮 ${element.channel.game} | 🎥 ${element.channel.status} (${element.channel.url})\n\n`
    });
    return streamersInfo
}

bot.command('live', async (ctx) => {
    try {
        const res = await fetch("https://app.twinibot.com/api/channels")
        const body = await res.json()
        ctx.reply(buildStreamers(body), {"disable_web_page_preview": true})
    } catch (error) {
        console.log(error)
        ctx.reply(`Error while loading the information. Please try again later.`)
    }
})

bot.startPolling()