import { MessageEmbed } from 'discord.js'

import Command from '../core/command'
import Message from '../core/message'

import TarkovItem from '../libs/tarkovmarket/interfaces/tarkovitem'
import TarkovMarket from '../libs/tarkovmarket/tarkov-market'

import MediaWikiBot from '../libs/mediawiki/mediawiki'
import Page from '../libs/mediawiki/classes/page'
import PageSection from '../libs/mediawiki/classes/pagesection'

export default class Price extends Command
{
    private _tarkovMarket: TarkovMarket = TarkovMarket.Instance
    private _mediaWikiBot: MediaWikiBot = MediaWikiBot.Instance

    constructor()
    {
        super({
            title: "Tarkov Price Check",
            description: "Test Description",
            command: "price"
        })
    }
    
    public async start(message: Message): Promise<void> 
    {
        const items: TarkovItem[] = await this._tarkovMarket.getItemByName(message.CommandInput!)

        const messageEmbed: MessageEmbed = new MessageEmbed()

        console.log(items)

        if (items.length == 0)
        {
            messageEmbed
                .setTitle('No results found')
        }
        else if (items.length > 1)
        {
            messageEmbed
                .setTitle('Multiple results found, please refine search:')
                .setDescription(items.map((item: TarkovItem) => {
                    return `> ${item.name}`
                }))
        }
        else if (items.length == 1)
        {
            console.log(items[0].bsgItem!.itemType)

            if (items[0].bsgItem!.itemType == "keys" || "item_plastic_generic")
            {
                const keyArticlePage: Page | undefined = await this._mediaWikiBot.getPage(items[0].name)
                const behindTheDoor: PageSection | undefined = keyArticlePage!.Sections.find((section: PageSection) => section.Title.toLowerCase() == 'behind the lock')

                messageEmbed
                    .setTitle(`${items[0].name}`)
                    .setURL(items[0].wikiLink)
                    .addFields(
                        { name: 'Market Price', value: `₽ ${items[0].price.toLocaleString()}`, inline: true },
                        { name: 'Price Per Slot', value: `₽ ${(items[0].price / items[0].slots).toLocaleString()} \n (${items[0].slots} Slot)`, inline: true },
                        { name: 'Market Change', value: `(24 Hours) ₽ ${(items[0].price - items[0].avg24hPrice).toLocaleString()} \n (7 Days)   ₽ ${(items[0].price - items[0].avg7daysPrice).toLocaleString()}`, inline: true },
                        { name: '\u200B', value: '\u200B' },
                        { name: 'What\'s behind the door?', value: behindTheDoor!.Content }
                    )
                    .setThumbnail(items[0].img)
                    .setFooter(`Market prices last updated on: ${this._tarkovMarket.lastRefreshDate!.toLocaleString()}`)
            }
            else
            {
                messageEmbed
                    .setTitle(`${items[0].name}`)
                    .setURL(items[0].wikiLink)
                    .addFields(
                        { name: 'Market Price', value: `₽ ${items[0].price.toLocaleString()}`, inline: true },
                        { name: 'Price Per Slot', value: `₽ ${(items[0].price / items[0].slots).toLocaleString()} \n (${items[0].slots} Slot)`, inline: true },
                        { name: 'Market Change', value: `(24 Hours) ₽ ${(items[0].price - items[0].avg24hPrice).toLocaleString()} \n (7 Days)   ₽ ${(items[0].price - items[0].avg7daysPrice).toLocaleString()}`, inline: true },
                    )
                    .setThumbnail(items[0].img)
                    .setFooter(`Market prices last updated on: ${this._tarkovMarket.lastRefreshDate!.toLocaleString()}`)
            }
        }

        await message.DiscordMessage.channel.send(messageEmbed)
    }
}