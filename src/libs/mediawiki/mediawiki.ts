import { mwn, ApiResponse } from 'mwn'
import HTMLParser, { HTMLElement} from 'node-html-parser'

import Page from './classes/page'
import { PageSection } from './interfaces'

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

    // Gets MediaWiki page containing tarkov key information
    public async getPage(pageTitle: string): Promise<Page>
    {
        const searchResults: ApiResponse = await this._mwApiClient.search('test', 1, ['size', 'worcount', 'timestamp'])
        
        if (searchResults[0])
        {
            const wikiHtmlParsed: HTMLElement = HTMLParser(searchResults[0].title)
        }
        
        console.log(searchResults[0].title)
    }
}