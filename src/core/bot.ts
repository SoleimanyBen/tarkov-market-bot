import { Client as DiscordClient, Message as DiscordMessage } from 'discord.js'

import IBot from '../interfaces/ibot'

export default class Bot implements IBot 
{
    client: DiscordClient

    constructor(apiKey: string) 
    {
        this.client = new DiscordClient()

        this.client.login(apiKey)
    }

    public async start(): Promise<void>
    {
        this.handleEvents()
    }

    private async handleEvents(): Promise<void> 
    {
        this.client.on('message', this.onMessage.bind(this))
    }

    private registerCommands(): void 
    {
        
    }

    private onMessage(discordMessage: DiscordMessage): void
    {
        
    }
}