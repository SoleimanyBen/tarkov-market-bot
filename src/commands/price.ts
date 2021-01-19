import { Message as DiscordMessage } from 'discord.js'

export default class Price {
    command: string


    constructor(command: string) {
        this.command = command
    }

    run(): Promise<void> {
        throw new Error('Method not implemented.');
    }

}