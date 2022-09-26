import { Command } from "@tauri-apps/api/shell";



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