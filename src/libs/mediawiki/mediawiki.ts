import { mwn } from 'mwn'

export default class MediaWikiBot
{
    private static _instance: MediaWikiBot

    private _mwApiClient: mwn

    constructor()
    {
        this._mwApiClient = new mwn({
            apiUrl: 'https://escapefromtarkov.gamepedia.com/api.php'
        })
    }

    public static get Instance(): MediaWikiBot
    {
        return this._instance || (this._instance = new this())
    }

}