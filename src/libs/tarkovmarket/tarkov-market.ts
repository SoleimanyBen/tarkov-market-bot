import got, { Got } from 'got'
import { isIterationStatement } from 'typescript'

import IBSGItem from './interfaces/ibsgitem'
import IItem from './interfaces/iitem'

export default class TarkovMarket {
    items: IItem[] = []

    httpClient: Got

    constructor() {
        this.httpClient = got.extend({
            prefixUrl: 'https://tarkov-market.com',
            responseType: 'json',
            headers: {
                'x-api-key': process.env.TARKOV_MARKET_TOKEN
            }
        })
    }

    async getItemData(): Promise<void> {
        try {
            const rawBsgItems: any = await this.httpClient('api/v1/bsg/items/all')
            const rawMarketItems: any = await this.httpClient('api/v1/items/all')

            rawMarketItems.body.forEach((data: any) => {
                const item: IItem = {
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
        } catch(e) {
            console.log(e)
        }
    }

    async getItemByName(name: string): Promise<IItem | undefined> {
        try {
            const searchResult: IItem | undefined = this.items.find((item: IItem) => item.name.toLowerCase().includes(name.toLowerCase()))

            if (searchResult) {
                console.log("got here")
                const updatedItemResult: any = await this.httpClient('api/v1/item', {
                    searchParams: {
                        uid: searchResult.uid
                    }
                })

                const itemResultBody: any = updatedItemResult.body

                searchResult.price = itemResultBody.price
                searchResult.basePrice = itemResultBody.basePrice
                searchResult.avg24hPrice = itemResultBody.avg24hPrice
                searchResult.avg7daysPrice = itemResultBody.avg7daysPrice
                searchResult.traderPrice = itemResultBody.traderPrice
                searchResult.diff24h = itemResultBody.diff24h
                searchResult.diff7days = itemResultBody.diff7days

                return searchResult
            }

            return undefined
        } catch(e) {

        }
    }
}