export default interface ICommand {
    command: string

    run(): Promise<void>
}