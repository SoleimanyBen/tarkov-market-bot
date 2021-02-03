import got, { Got } from 'got'
import { isIterationStatement } from 'typescript'

import IBSGItem from './interfaces/ibsgitem'
import ITarkovItem from './interfaces/itarkovitem'

export default class TarkovMarket {
    private static _instance?: TarkovMarket

    private _items: ITarkovItem[] = []
    private httpClient: Got

    public lastRefreshDate?: Date

    constructor() 
    {
        this.httpClient = got.extend({
            prefixUrl: 'https://tarkov-market.com',
            responseType: 'json',
            headers: {
                'x-api-key': process.env.TARKOV_MARKET_TOKEN
            }
        })
    }

    public static get Instance(): TarkovMarket
    {
        return this._instance || (this._instance = new this())
    }

    public async refreshItemData(): Promise<void> 
    {
        try
        {
            const rawBsgItems: any = await this.httpClient('api/v1/bsg/items/all')
            const rawMarketItems: any = await this.httpClient('api/v1/items/all')

            this._items = []

            rawMarketItems.body.forEach((item: ITarkovItem) => {
                const rawBsgItem: any = rawBsgItems.body[item.bsgId]

                const bsgItem: IBSGItem = {
                    id: rawBsgItem['_id'],
                    name: rawBsgItem['_props'].Name,
                    shortName: rawBsgItem['_props'].ShortName,
                    description: rawBsgItem['_props'].Description,
                    weight: rawBsgItem['_props'].Weight,
                    width: rawBsgItem['_props'].Width,
                    height: rawBsgItem['_props'].Height,
                    maxStackSize: rawBsgItem['_props'].StackMaxSize,
                    rarity: rawBsgItem['_props'].Rarity,
                    spawnChance: rawBsgItem['_props'].SpawnChance,
                    questItem: rawBsgItem['_props'].QuestItem
                }

                item.bsgItem = bsgItem

                this._items.push(item)
            })
        } 
        catch(e) 
        {
            console.log(e)
        }
    }

    private async refresh(): Promise<void>
    {
        const currentDate: Date = new Date()

        if (!this.lastRefreshDate || (currentDate.getTime() - this.lastRefreshDate.getTime()) > 60000)
        {
            this.lastRefreshDate = currentDate

            await this.refreshItemData()
        }
    }

    public async getItemByName(searchResult: string[]): Promise<ITarkovItem[] | undefined> 
    {
        await this.refresh()

        const searchPattern: string = searchResult.map((value: string) => {
            return `(?=.*${value})`
        }).join("")

        try 
        {
            const searchResult: ITarkovItem[] | undefined = this._items.filter((item: ITarkovItem) => item.name.match(searchPattern))

            if (searchResult) 
                return searchResult

            return undefined
        } 
        catch(e) 
        {
            console.log(e) // handle error
        }
    }
}