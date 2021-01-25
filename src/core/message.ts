import { Message as DiscordMessage } from 'discord.js'

import Command from './command'

export default class Message 
{
    private discordMessage: DiscordMessage
    private command?: Command

    constructor(discordMessage: DiscordMessage)
    {
        this.discordMessage = discordMessage
    }
}