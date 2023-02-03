import { TypeOfDeviceEnum } from "./enums/device.enum";

export interface Device {
    id: string;
    name: string;
    type: TypeOfDeviceEnum
    state?: string
}

export type IosDeviceFromSimctlJson = {
    dataPath: string;
    dataPathSize: string
    deviceTypeIdentifier: string,
    isAvailable: boolean
    logPath: string
    name: string
    state: string
    udid: string
}


export type IosAppsFromSimctlJson = {
    ApplicationType: "System" | "User";
    Bundle: string;
    CFBundleDisplayName: string;
    CFBundleExecutable: string;
    CFBundleIdentifier: "com.apple.Bridge";
    CFBundleName: string;
    CFBundleVersion: string;
    DataContainer: string;
    GroupContainers: object;
    Path: string
    SBAppTags: string
}