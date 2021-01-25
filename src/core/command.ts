import Message from "./message"
import ICommand from "../interfaces/icommand";

export default abstract class Command 
{
    private message: Message

    constructor(message: Message)
    {
        this.message = message
    }

    protected abstract async run(): Promise<void>
}