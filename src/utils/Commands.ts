import { Command } from "@tauri-apps/api/shell";
import { platform } from '@tauri-apps/api/os';


export async function getListPackets(onData: (result: string) => void, onError: (result: string) => void, onClose: (result: string) => void) {
    sendCommand('list_packages', [
        "shell",
        "pm",
        "list",
        "packages"
    ], onData, onError, onClose);
}


export async function getListDevices(onData: (result: string) => void, onError: (result: string) => void, onClose: (result: string) => void) {
    sendCommand('list_devices', [
        "devices",
        "-l"
    ], onData, onError, onClose);
}

export async function screenCap(dirOnDevice = '/sdcard/screen.png', onData: (result: string) => void, onError: (result: string) => void, onClose: (result: string) => void) {
    sendCommand('screen_cap', [
        "shell",
        "screencap",
        dirOnDevice
    ], onData, onError, onClose);
}


export async function recordScreen(dirOnDevice = '/sdcard/demo.mp4', onData: (result: string) => void, onError: (result: string) => void, onClose: (result: string) => void) {
    sendCommand('screen_record', [
        "shell",
        "screenrecord",
        dirOnDevice
    ], onData, onError, onClose);
}


export async function startAppCommand(packageActive: string, onData: (result: string) => void, onError: (result: string) => void, onClose: (result: string) => void) {
    sendCommand('start_app', ["shell",
        "am",
        "start",
        "-n", `${packageActive}/.MainActivity`], onData, onError, onClose);
}


export async function stopAppCommand(packageActive: string, onData: (result: string) => void, onError: (result: string) => void, onClose: (result: string) => void) {
    sendCommand('stop_the_app', ["shell", "am", "force-stop", `${packageActive}`], onData, onError, onClose);
}

export async function cleanCommand(packageActive: string, onData: (result: string) => void, onError: (result: string) => void, onClose: (result: string) => void) {
    sendCommand('clear_app', ["shell",
        "pm",
        "clear", `${packageActive}`], onData, onError, onClose);
}

export async function removeApp(deviceName: string, packageActive: string, onData: (result: string) => void, onError: (result: string) => void, onClose: (result: string) => void) {
    sendCommand('remove_app', [
        "-s",
        deviceName,
        "shell",
        "pm",
        "uninstall",
        packageActive,
    ], onData, onError, onClose);
}

export async function openShellOnDevice(nameDevice: string, onData: (result: string) => void, onError: (result: string) => void, onClose: (result: string) => void) {

    const platformName = await platform();

    switch (platformName) {
        case "darwin":
            sendCommand('open_shell_mac_os', [
                "-e",
                `tell app "Terminal" to do script "adb -s ${nameDevice} shell"`
            ], onData, onError, onClose);
            break;
        case "win32":
            sendCommand('open_shell_mac_os', [
                "-e",
                `tell app "Terminal" to do script "adb -s ${nameDevice} shell"`
            ], onData, onError, onClose);
        default:
            break;
    }
}

export async function reverseConnection(nameDevice: string, portService: number, portDevice: number, onData: (result: string) => void, onError: (result: string) => void, onClose: (result: string) => void) {


    sendCommand('reverse_connection', [
        "-s",
        nameDevice,
        "reverse",
        `tcp:${portService}`,
        `tcp:${portDevice}`
    ], onData, onError, onClose);

}

export async function cleanAndRestartCommand(packageActive: string, onData: (result: string) => void, onError: (result: string) => void, onClose: (result: string) => void) {
    await cleanCommand(packageActive, onData, onError, () => {
        stopAppCommand(packageActive, onData, onError, () => {
            startAppCommand(packageActive, onData, onError, onClose);
        });
    });
}


export async function sendCommand(commandName: string, params: string[], onData: (result: string) => void, onError: (result: string) => void, onClose: (result: string) => void) {
    const command = new Command(commandName, params);
    command.on('close', onClose)
    command.on('error', onError);
    command.stdout.on('data', onData)
    command.stderr.on('data', onError)
    await command.spawn().catch((_err) => {
        onError(_err);
    });
}