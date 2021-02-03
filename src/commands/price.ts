import { MessageEmbed } from 'discord.js'

import Command from "../core/command";
import Message from "../core/message";

import ITarkovItem from "../libs/tarkovmarket/interfaces/itarkovitem";
import TarkovMarket from "../libs/tarkovmarket/tarkov-market";

export default class Price extends Command
{
    private _tarkovMarket: TarkovMarket = TarkovMarket.Instance

    constructor()
    {
        super("Price", "Test Description", "p")
    }
    
    public async start(message: Message): Promise<void> 
    {
        const items: ITarkovItem[] | undefined = await this._tarkovMarket.getItemByName(message.CommandInput!)

        if (items)
        {
            if (items.length != 1)
            {
                const messageEmbed: MessageEmbed = new MessageEmbed()
                    .setTitle('Multiple results found, please refine search:')
                    .setDescription(items.map((item: ITarkovItem) => {
                        return `> ${item.name}`
                    }))

                await message.DiscordMessage.channel.send(messageEmbed)
            }
            else
            {
                const messageEmbed: MessageEmbed = new MessageEmbed()
                    .setTitle(`${items[0].name}`)
                    .setURL(items[0].wikiLink)
                    .addFields(
                        { name: 'Market Price', value: `₽ ${items[0].price.toLocaleString()}`, inline: true },
                        { name: 'Price Per Slot', value: `₽ ${items[0].price / items[0].slots} \n (${items[0].slots} Slot)`, inline: true },
                        { name: 'Market Change', value: `(24 Hours) ₽ ${(items[0].price - items[0].avg24hPrice).toLocaleString()} \n (7 Days)   ₽ ${(items[0].price - items[0].avg7daysPrice).toLocaleString()}`, inline: true },
                    )
                    .setThumbnail(items[0].img)
                    .setFooter(`Market prices last updated on: ${this._tarkovMarket.lastRefreshDate!.toLocaleString()}`)

                await message.DiscordMessage.channel.send(messageEmbed)
            }
        }
    }
}