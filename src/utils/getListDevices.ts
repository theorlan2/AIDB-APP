import { Device, IosDeviceFromSimctlJson } from "../models/device.model";
import { TypeOfDeviceEnum } from "../models/enums/device.enum";


export function getTypeAndModelDevice(str: string): Device | null {
    let result = null;
    let startPosition = str.indexOf('product');
    let lastPosition = str.indexOf('model');
    let positionFirstWhiteSpace = str.indexOf(' ');

    if (!startPosition || str.trimEnd() === 'List of devices attached') {
        return result;
    }

    result = { id: str.substring(0, positionFirstWhiteSpace), name: str.substring(startPosition + ('product:'.length), lastPosition), type: TypeOfDeviceEnum.ANDROID };

    return result;

}

export function getTypeAndModelDeviceIOS(data: IosDeviceFromSimctlJson): Device {
    return { id: data.udid, name: data.name, type: TypeOfDeviceEnum.IPHONE, state: data.state };
}
