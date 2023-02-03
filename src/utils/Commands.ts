import { Command } from "@tauri-apps/api/shell";
import { platform } from "@tauri-apps/api/os";
import { TypeOfDeviceEnum } from "../models/enums/device.enum";
import { Device } from "../models/device.model";

let optionsToCommands = {
  title: '',
  commands: [] as string[]
}

function setDataToOptionsToCommands(deviceType: TypeOfDeviceEnum, title: { ios: string, android: string }, optionsAndroid: string[], optionsIos: string[]) {
  switch (deviceType) {
    case TypeOfDeviceEnum.IPHONE:
      optionsToCommands = {
        title: title.ios,
        commands: ["simctl", ...optionsIos],
      }
      break;

    default:
      optionsToCommands = {
        title: title.android,
        commands: ["shell", ...optionsAndroid],
      }
      break;
  }
}


export async function getListPackets(
  deviceType: TypeOfDeviceEnum,
  onData: (result: string) => void,
  onError: (result: string) => void,
  onClose: (result: string) => void
) {

  setDataToOptionsToCommands(deviceType,
    { ios: 'list_packages_ios', android: 'list_packages' },
    ["pm", "list", "packages"],
    ["listapps", "booted"]);
  switch (deviceType) {
    case TypeOfDeviceEnum.IPHONE:
      sendCommand(
        optionsToCommands.title,
        optionsToCommands.commands,
        (r) => r.indexOf(' =     {') > 1 && onData((r.replaceAll('=', '').replaceAll(':', '').replaceAll(';', '').replace(/(\r\n|\n|\r)/gm, '').replace(/[/\"/]/g, '').replace('{', '')).replace(/\s/g, '')),
        onError,
        onClose
      );
      break;
    default:
      sendCommand(
        optionsToCommands.title,
        optionsToCommands.commands,
        onData,
        onError,
        onClose
      );
      break;

  }
}

export async function getListDevices(
  onData: (result: string) => void,
  onError: (result: string) => void,
  onClose: (result: string) => void
) {
  sendCommand("list_devices", ["devices", "-l"], onData, onError, onClose);
}

export async function getListDevicesIOS(
  onData: (result: string) => void,
  onError: (result: string) => void,
  onClose: (result: string) => void
) {
  sendCommand("list_devices_ios", ["list-targets"], onData, onError, onClose);
}

export async function screenCap(
  dirOnDevice = "/sdcard/screen.png",
  onData: (result: string) => void,
  onError: (result: string) => void,
  onClose: (result: string) => void
) {
  sendCommand(
    "screen_cap",
    ["shell", "screencap", dirOnDevice],
    onData,
    onError,
    onClose
  );
}

export async function recordScreen(
  dirOnDevice = "/sdcard/demo.mp4",
  onData: (result: string) => void,
  onError: (result: string) => void,
  onClose: (result: string) => void
) {
  sendCommand(
    "screen_record",
    ["shell", "screenrecord", dirOnDevice],
    onData,
    onError,
    onClose
  );
}


export async function startAppCommand(
  device: Device,
  packageActive: string,
  mainActivity: string,
  onData: (result: string) => void,
  onError: (result: string) => void,
  onClose: (result: string) => void
) {

  setDataToOptionsToCommands(device.type, { android: 'start_app', ios: 'start_app_ios' },
    ["am", "start", "-n", `${packageActive}/.${mainActivity}`],
    ["launch", device.id, packageActive]);

  sendCommand(
    optionsToCommands.title,
    optionsToCommands.commands,
    onData,
    onError,
    onClose
  );
}

export async function stopAppCommand(
  device: Device,
  packageActive: string,
  onData: (result: string) => void,
  onError: (result: string) => void,
  onClose: (result: string) => void
) {

  setDataToOptionsToCommands(device.type, { android: 'stop_the_app', ios: 'stop_the_app_ios' },
    ["am", "force-stop", `${packageActive}`],
    ["terminate", device.id, packageActive])

  sendCommand(
    optionsToCommands.title,
    optionsToCommands.commands,
    onData,
    onError,
    onClose
  );
}

export async function cleanCommand(
  device: Device,
  packageActive: string,
  onData: (result: string) => void,
  onError: (result: string) => void,
  onClose: (result: string) => void
) {

  switch (device.type) {
    case TypeOfDeviceEnum.IPHONE:
      sendCommand(
        "get_data_ios_app",
        [
          'simctl', 'get_app_container', device.id, packageActive, 'data'
        ],
        (r: string) => {
          onData(r);
          sendCommand(
            "clear_ios_app",
            ['-rf', r],
            onData, onError, onClose)
        },
        onError,
        onClose)

      break;
    default:
      sendCommand(
        "clear_app",
        ["shell", "pm", "clear", `${packageActive}`],
        onData,
        onError,
        onClose
      );
      break;
  }
}

export async function removeApp(
  device: Device,
  packageActive: string,
  onData: (result: string) => void,
  onError: (result: string) => void,
  onClose: (result: string) => void
) {

  setDataToOptionsToCommands(device.type, {
    ios: 'remove_app_ios',
    android: 'remove_app'
  },
    ["-s", device.name, "pm", "uninstall", packageActive],
    ["uninstall", device.id, packageActive]
  )
  sendCommand(optionsToCommands.title, optionsToCommands.commands,
    onData,
    onError,
    onClose
  );
}

export async function openShellOnDevice(
  nameDevice: string,
  onData: (result: string) => void,
  onError: (result: string) => void,
  onClose: (result: string) => void
) {
  const platformName = await platform();

  switch (platformName) {
    case "darwin":
      sendCommand(
        "open_shell_mac_os",
        ["-e", `tell app "Terminal" to do script "adb -s ${nameDevice} shell"`],
        onData,
        onError,
        onClose
      );
      break;
    case "linux":
      sendCommand(
        "open_shell_linux",
        ["--", "bash", "-ic", `"adb -s ${nameDevice} shell; exec bash;"`],
        onData,
        onError,
        onClose
      );
      break;
    case "win32":
      sendCommand(
        "open_shell_mac_os",
        ["-e", `tell app "Terminal" to do script "adb -s ${nameDevice} shell"`],
        onData,
        onError,
        onClose
      );
    default:
      break;
  }
}

export async function reverseConnection(
  nameDevice: string,
  portService: number,
  portDevice: number,
  onData: (result: string) => void,
  onError: (result: string) => void,
  onClose: (result: string) => void
) {
  sendCommand(
    "reverse_connection",
    ["-s", nameDevice, "reverse", `tcp:${portService}`, `tcp:${portDevice}`],
    onData,
    onError,
    onClose
  );
}

export async function cleanAndRestartCommand(
  device: Device,
  packageActive: string,
  mainActivity: string,
  onData: (result: string) => void,
  onError: (result: string) => void,
  onClose: (result: string) => void
) {
  await cleanCommand(device, packageActive, onData, onError, () => {
    stopAppCommand(device, packageActive, onData, onError, () => {
      startAppCommand(device, packageActive, mainActivity, onData, onError, onClose);
    });
  });
}

export async function sendCommand(
  commandName: string,
  params: string[],
  onData: (result: string) => void,
  onError: (result: string) => void,
  onClose: (result: string) => void
) {
  const command = new Command(commandName, params);
  command.on("close", onClose);
  command.on("error", onError);
  command.stdout.on("data", onData);
  command.stderr.on("data", onError);
  await command.spawn().catch((_err) => {
    onError(_err);
  });
}
