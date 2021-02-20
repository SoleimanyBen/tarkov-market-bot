import { mwn, ApiResponse } from 'mwn'
import HTMLParser, { HTMLElement} from 'node-html-parser'

import Page from './classes/page'

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
    public async getPage(pageTitle: string): Promise<Page | undefined>
    {
        const searchResults: ApiResponse = await this._mwApiClient.search(pageTitle, 1, ['size', 'timestamp'])
        
        if (searchResults[0])
        {
            const wikiPageResponse: string = await this._mwApiClient.parseTitle(searchResults[0].title)

            const wikiPageElement: HTMLElement = HTMLParser(wikiPageResponse)
            const wikiContentElement: HTMLElement = wikiPageElement.querySelector('.mw-parser-output')

            // console.log(wikiContentElement)

            const articlePage: Page = new Page(wikiContentElement)

            await articlePage.parse()

            return articlePage
        }
    }
}