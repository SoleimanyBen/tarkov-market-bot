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
        super("Price", "Test Description", "price")

        console.log("Price loaded")
    }
    
    public async start(message: Message): Promise<void> 
    {
        console.log(message.CommandInput!)

        const item: ITarkovItem | undefined = await this._tarkovMarket.getItemByName(message.CommandInput!)

        if (item)
        {
            const messageEmbed: MessageEmbed = new MessageEmbed()
                .setTitle(`${item!.name}`)
                .setDescription(item!.bsgItem!.description)
                .setURL(item!.link)
                .addFields(
                    { name: 'Current Market Price', value: `₽ ${item!.price.toLocaleString()}`, inline: true },
                    { name: 'Market Avg 24hr', value: `₽ ${item!.avg24hPrice.toLocaleString()}`, inline: true },
                    { name: 'Market Avg 7d', value: `₽ ${item!.avg7daysPrice.toLocaleString()}`, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Rarity', value: item!.bsgItem!.rarity, inline: true },
                    { name: 'Spawn Chance', value: item!.bsgItem!.spawnChance, inline: true },
                    { name: 'Quest Item', value: item!.bsgItem!.questItem, inline: true },

                )
                .setThumbnail(item!.img)
                .setFooter(`This information is accurate as of ${this._tarkovMarket.lastRefreshDate!.toUTCString()}`)

            message.DiscordMessage.channel.send(messageEmbed)
        }
        
    }
}