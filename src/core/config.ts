import fs from 'fs'
import path from 'path'

export default class Config
{
    public load(path: string): void
    {
        const configFile: any = fs.readFileSync(path)


    }
}