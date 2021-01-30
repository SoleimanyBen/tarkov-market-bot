import fs from 'fs'
import path from 'path'

import { Client, Message as DiscordMessage } from 'discord.js'

import Message from './message'
import Command from './command'

export default class Bot
{
    private _client: Client
    private _commands: Command[]
    private _apiKey?: string

    constructor(apiKey?: string | undefined) 
    {
        this._client = new Client()
        this._commands = []
        this._apiKey = apiKey
    }

    public async start(): Promise<void>
    {
        await this.login()
        await this.handleEvents()
        await this.loadCommands()
    }

    private async login(): Promise<void>
    {
        console.log(this._apiKey!)
        await this._client.login(this._apiKey!)
    }

    private async handleEvents(): Promise<void> 
    {
        this._client.on('message', this.onMessage.bind(this))
    }

    private async loadCommands(): Promise<void> 
    {
        const commandPath: string = path.join(__dirname, '../commands/')
        const commandData: string[] = fs.readdirSync(commandPath)

        for (let commandName of commandData)
        {
            const modulePath: string = path.join(commandPath, commandName)

            const module: any = await (await import(modulePath)).default
            const command: Command = new module()

            this._commands.push(command)
        }
    }

    private onMessage(discordMessage: DiscordMessage): void
    {
        const message: Message = new Message(this, discordMessage)

        if (message.IsCommand())
        {
            message.Command!.run(message)
        }
    }

    public get Commands(): Command[]
    {
        return this._commands
    }
}