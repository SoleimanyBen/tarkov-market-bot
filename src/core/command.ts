import fs from 'fs'
import path from 'path'

import Message from "./message"

export default abstract class Command 
{
    private _name: string
    private _description: string
    private _command: string

    constructor(name: string, description: string, command: string)
    {
        this._name = name
        this._description = description
        this._command = command
    }

    protected abstract start(message: Message): Promise<void>

    public async run(message: Message): Promise<void>
    {
        await this.start(message)
    }

    public get Command(): string
    {
        return this._command
    }
}