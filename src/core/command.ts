import { TextChannel, NewsChannel, DMChannel } from 'discord.js'
import fs from 'fs'
import path from 'path'

import Message from "./message"

export default abstract class Command 
{
    private _name: string
    private _description: string
    private _command: string

    private _whitelistedChannels: (TextChannel | DMChannel | NewsChannel)[]

    constructor(name: string, description: string, command: string)
    {
        this._name = name
        this._description = description
        this._command = command

        this._whitelistedChannels = []
    }

    protected abstract start(message: Message): Promise<void>

    public async run(message: Message): Promise<void>
    {
        await this.start(message)
    }
    
    public addWhitelistedChannel(channel: TextChannel | NewsChannel | DMChannel): void
    {
        if (this._whitelistedChannels && !this._whitelistedChannels.includes(channel))
        { 
            this._whitelistedChannels.push(channel)
        }
    }

    public removeWhitelistedChannel(channel: TextChannel | NewsChannel | DMChannel): void
    {
        if (this._whitelistedChannels && this._whitelistedChannels.includes(channel))
        {
            this._whitelistedChannels.splice(this._whitelistedChannels.indexOf(channel), 1)
        }
    }

    public get Command(): string
    {
        return this._command
    }
}