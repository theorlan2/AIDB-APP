

export function getTypeAndModelDevice(str: string): { id: string, name: string } | null {
    let result = null;
    let startPosition = str.indexOf('product');
    let lastPosition = str.indexOf('model');
    let positionFirstWhiteSpace = str.indexOf(' ');

    if (!startPosition || str.trimEnd() === 'List of devices attached') {
        return result;
    }

    result = { id: str.substring(0, positionFirstWhiteSpace), name: str.substring(startPosition + ('product:'.length), lastPosition) };

    return result;

}

export function getTypeAndModelDeviceIOS(str: string): { id: string, name: string } | null {
    let modelPosition = 0;
    let uuidPosition = 1;
    let dividerChar = '|';
    let dataAboutDevice = str.split(dividerChar);
    if (!Array.isArray(dataAboutDevice)) {
        return null;
    }

   return { id: dataAboutDevice[uuidPosition], name: dataAboutDevice[modelPosition] };

}
