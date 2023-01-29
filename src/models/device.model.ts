import { DeviceTypeEnum } from "./enums/device.enum";

export interface Device {
    id: string;
    name: string;
    type: DeviceTypeEnum
} 