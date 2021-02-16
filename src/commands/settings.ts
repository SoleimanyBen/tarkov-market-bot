import Command from "../core/command";
import Message from "../core/message";


export default class Settings extends Command
{
    constructor()
    {
        super("Settings", "Settings for bot", "listen")
    }

    public async start(message: Message): Promise<void>
    {
        
    }
}
