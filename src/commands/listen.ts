import Command from "../core/command";
import Message from "../core/message";


export default class Listen extends Command
{
    constructor()
    {
        super("Listen", "Forces the bot to listen to the selected channel for commands", "listen")
    }

    public async start(message: Message): Promise<void>
    {
        
    }
}
