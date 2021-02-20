
export default class PageSection
{
    private _title: string
    private _content: string[] = []
    private _links?: string[]
    
    constructor(title: string)
    {
        this._title = title
    }

    public addContent(line: string)
    {
        this._content.push(line)
    }

    public get Title(): string
    {
        return this._title
    }

    public get Content(): string[]
    {
        return this._content
    }

    public get Links(): string[] | undefined
    {
        return this._links
    }
}