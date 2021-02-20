import { HTMLElement, Node, NodeType } from 'node-html-parser'
import PageSection from './pagesection'

export default class Page
{
    private _sections: PageSection[] = []
    private _rawHTMLData: HTMLElement

    constructor(wikiPageContent: HTMLElement)
    {
        this._rawHTMLData = wikiPageContent
    }

    public async parse(): Promise<void>
    {
        const childNodes: HTMLElement[] = (this._rawHTMLData.childNodes.filter((node: Node) => node.nodeType == NodeType.ELEMENT_NODE)) as HTMLElement[]

        let firstH2Hit: boolean = false

        for (let element of childNodes)
        {
            switch (element.tagName)
            {
                case 'TABLE':
                    break
                case 'H2':
                    if (!firstH2Hit)
                        firstH2Hit = true
                    
                    const titleElement: Node = element.firstChild

                    if (titleElement.nodeType == NodeType.ELEMENT_NODE)
                        this._sections.push(new PageSection(titleElement.text))

                    break
                case 'P':
                    if (firstH2Hit)
                        this._sections[this._sections.length - 1].addContent(element.text)

                    break
                case 'UL':
                    const listElements: Node[] = element.childNodes

                    for (let liElement of listElements)
                    {
                        if (liElement.nodeType == NodeType.ELEMENT_NODE)
                        {
                            this._sections[this._sections.length - 1].addContent(liElement.text)
                        }
                    }

                    break
            }
        }
    }

    public getSectionByName(name: string): PageSection | undefined
    {
        return this._sections.find((section: PageSection) => section.Title == name)
    }

    public get Sections(): PageSection[]
    {
        return this._sections
    }
}