import { CommandStatus } from "./enums/commands.enum";

export interface CommandI {
    str: string;
    status: CommandStatus;
    date: string;
}