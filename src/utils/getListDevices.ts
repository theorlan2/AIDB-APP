

export function getTypeAndModelDevice(str: string): { id: string, name: string } | null {
    let result = null;
    let startPosition = str.indexOf('product');
    let lastPosition = str.indexOf('model');
    let positionFirstWhiteSpace = str.indexOf(' ');

    if (!startPosition || str === 'List of devices attached') {
        return result;
    }

    result = { id: str.substring(0, positionFirstWhiteSpace), name: str.substring(startPosition + ('product:'.length), lastPosition) };

    return result;

}
