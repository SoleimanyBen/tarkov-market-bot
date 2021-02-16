export default interface IBSGItem {
    id: string
    name: string
    shortName: string
    description: String
    weight: number
    width: number
    height: number
    maxStackSize: number
    rarity: string
    spawnChance: number
    itemType: string
    questItem: boolean
    mergesWithChildren: boolean
    recoil?: number
    ergonomics?: number
}