import got, { Got } from 'got'
import { isIterationStatement } from 'typescript'

import IBSGItem from './interfaces/ibsgitem'
import ITarkovItem from './interfaces/itarkovitem'

export default class TarkovMarket {
    private static _instance?: TarkovMarket

    private items: ITarkovItem[] = []
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

            rawMarketItems.body.forEach((data: any) => {
                const item: ITarkovItem = {
                    uid: data.uid,
                    name: data.name,
                    shortName: data.shortName,
                    price: data.price,
                    basePrice: data.basePrice,
                    avg24hPrice: data.avg24hPrice,
                    avg7daysPrice: data.avg7daysPrice,
                    traderName: data.traderName,
                    traderPrice: data.traderPrice,
                    traderPriceCur: data.traderPriceCur,
                    updated: data.updated,
                    slots: data.slots,
                    diff24h: data.diff24h,
                    diff7days: data.diff7days,
                    icon: data.icon,
                    link: data.link,
                    img: data.img,
                    imgBig: data.imgBig,
                    bsgId: data.bsgId,
                    isFunctional: data.isFunctional
                }

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

                this.items.push(item)
            })

            console.log("Tarkov Items API Loaded")
        } 
        catch(e) 
        {
            console.log(e)
        }
    }

    async getItemByName(name: string): Promise<ITarkovItem | undefined> 
    {
        const currentDate: Date = new Date()

        if (!this.lastRefreshDate || (currentDate.getTime() - this.lastRefreshDate.getTime()) > 60000)
        {
            this.lastRefreshDate = currentDate

            await this.refreshItemData()
        }
        
        try 
        {
            const searchResult: ITarkovItem | undefined = this.items.find((item: ITarkovItem) => item.name.toLowerCase().includes(name.toLowerCase()))

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