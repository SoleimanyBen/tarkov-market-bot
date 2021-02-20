import Message from "../core/message"
import Command from "../core/command";

import MediaWikiBot from '../libs/mediawiki/mediawiki'

export default class Listen extends Command
{
    private _mediaWikiBot: MediaWikiBot = MediaWikiBot.Instance

    constructor()
    {
        super({
            title: "test",
            description: "running description",
            command: "test"
        })
    }

    public async start(message: Message): Promise<void>
    {
        this._mediaWikiBot.getPage('RB-AM key')
    }
}