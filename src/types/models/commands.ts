import { CommandStatus } from "../enums/commands";

export interface CommandI {
    str: string;
    status: CommandStatus;
    date: string;
}