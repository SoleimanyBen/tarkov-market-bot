import readline from 'readline'

import Bot from "./core/bot"
import TarkovMarket from "./libs/tarkovmarket/tarkov-market"

require('dotenv').config()


async function start() {
    // const tarkovMarket = new TarkovMarket()

    // await tarkovMarket.getItemData()

    // for (;;) {
    //     const ans: any = await testEntry()

    //     tarkovMarket.getItemByName(ans)
    // }

    const bot: Bot = new Bot()

    await bot.start()
}


function testEntry() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise((resolve) => rl.question('Enter search query', (answer) => {
        rl.close()
        resolve(answer)
    }))
}

start()