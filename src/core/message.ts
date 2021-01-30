import { Message as DiscordMessage } from 'discord.js'

import Bot from './bot'
import Command from './command'

export default class Message 
{
    private _discordMessage: DiscordMessage
    private _messageContent: string
    private _command?: Command
    private _commandInput?: string
    private _bot: Bot

    constructor(bot: Bot, discordMessage: DiscordMessage)
    {
        this._bot = bot
        this._discordMessage = discordMessage
        this._messageContent = discordMessage.content

        this.parse()
    }

    private parse(): void
    {
        if (this._messageContent.startsWith(process.env.DISCORD_BOT_PREFIX!))
        {
            const splitMessageContent: string[] = this._messageContent.split(' ')
            const commandString: string = splitMessageContent[0].replace(process.env.DISCORD_BOT_PREFIX!, '')

            const command: Command | undefined = this._bot.Commands.find((command: Command) => command.Command == commandString)

            if (command)
            {
                this._command = command
                this._commandInput = splitMessageContent[1]
            }
            else
            {
                this._discordMessage.author.send('Invalid command')
            }
        }
    }

    public IsCommand(): Boolean
    {
        if (this._command)
        {
            return true
        }

        return false
    }

    public get Command(): Command | undefined
    {
        return this._command
    }

    public get CommandInput(): string | undefined
    {
        return this._commandInput
    }

    public get DiscordMessage(): DiscordMessage
    {
        return this._discordMessage
    }
}