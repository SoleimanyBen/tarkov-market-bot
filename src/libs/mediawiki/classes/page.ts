import { PageSection } from "../interfaces";

export default class Page
{
    private _sections: PageSection[]

    constructor()
    {
        this._sections = []
    }

    public async parse(): Promise<void>
    {
        
    }
}