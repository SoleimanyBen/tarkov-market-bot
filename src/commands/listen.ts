import Message from "../core/message"
import Command from "../core/command";

export default class Listen extends Command
{
    constructor()
    {
        super("Listen", "Listen description", "listen")
    }

    public async start(message: Message): Promise<void>
    {
        
    }
}