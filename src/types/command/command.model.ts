import { CommandStatus } from "./command.enum";

export interface CommandI {
  str: string;
  status: CommandStatus;
  date: string;
}
