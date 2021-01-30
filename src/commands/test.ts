import Command from "../core/command";

export default class Test extends Command
{
    constructor()
    {
        super("Test", "test", "test")

        console.log("Test is loaded")
    }

    public async start(): Promise<void> 
    {
        throw new Error("Method not implemented.");
    }
}