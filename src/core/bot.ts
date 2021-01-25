import fs from 'fs'
import path from 'path'

import { Client, Message as DiscordMessage } from 'discord.js'

import Message from './message'
import Command from './command'

export default class Bot
{
    private client: Client
    private commands?: Command[]

    constructor(apiKey?: string) 
    {
        this.client = new Client()

        // this.client.login()
    }

    public async start(): Promise<void>
    {
        await this.handleEvents()
        await this.handleCommands()
    }

    private async handleEvents(): Promise<void> 
    {
        // this.client.on('message', this.onMessage.bind(this))
    }

    private async handleCommands(): Promise<void> 
    {
        const modulesList: string[] = fs.readdirSync(path.join(__dirname, '../commands/'))

        for (let moduleData in modulesList)
        {

        }
    }

    private onMessage(discordMessage: DiscordMessage): void
    {
        const message: Message = new Message(discordMessage)
    }
}