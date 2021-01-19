import IBSGItem from "./ibsgitem";

export default interface IItem {
    uid: string
    bsgItem?: IBSGItem
    name: string
    shortName: string
    price: number
    basePrice: number
    avg24hPrice: number
    avg7daysPrice: number
    traderName: string
    traderPrice: number
    traderPriceCur: string
    updated: Date
    slots: number
    diff24h: number
    diff7days: number
    icon: string
    link: string
    img: string
    imgBig: string
    bsgId: string
    isFunctional: boolean
}