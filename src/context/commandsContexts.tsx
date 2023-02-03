import React, { createContext, useContext, useState } from 'react';
import { CommandStatus } from '../models/enums/commands.enum';
import { CommandI } from '../models/commands.model';
import { cleanAndRestartCommand, cleanCommand, getListDevices, getListDevicesIOS as getListIOSDevices, openShellOnDevice, removeApp, reverseConnection, startAppCommand, stopAppCommand } from '../utils/Commands';
import { getTypeAndModelDevice, getTypeAndModelDeviceIOS } from '../utils/getListDevices';
import { Device, IosDeviceFromSimctlJson } from '../models/device.model';
import { platform } from '@tauri-apps/api/os';


export const CommandsContext = createContext({
    commands: [] as CommandI[],
    devices: [] as Device[],
    deviceActive: {} as Device,
    isLoadingCommand: false,
    setIsLoadingCommand: (value: boolean) => { },
    setDeviceActive: (value: Device) => { },
    packageActive: '',
    packageMainActivity: 'MainActivity',
    setPackageMainActivity: (value: string) => { },
    getTheListDevices: () => { },
    setPackageActive: (value: string) => { },
    removeTheApp: (packageActive: string, callBackSucces: () => void, callBackError?: () => void) => { },
    openApp: () => { },
    setCommands: (t: any) => { },
    openShellAdb: () => { },
    closeApp: () => { },
    clearApp: () => { },
    clearAndRestartApp: () => { },
    reverseConnectionAdb: (portService: number, portDevice: number) => { }
});


export const CommandsProvider = (props: any) => {

    const [isLoadingCommand, setIsLoadingCommand] = useState(false);
    const [devices, setDevices] = useState([] as Device[]);
    const [commands, setCommands] = useState([] as CommandI[]);
    const [packageActive, setPackageActive] = useState('');
    const [packageMainActivity, setPackageMainActivity] = useState('MainActivity');
    const [deviceActive, setDeviceActive] = useState({} as Device);

    function setCommandInfo(str: string) {
        const dateNow = new Date().toDateString();
        setCommands((previewState: CommandI[]) => [...previewState, { str, status: CommandStatus.INFO, date: dateNow }]);
    }
    function setCommandError(_error: string) {
        const dateNow = new Date().toDateString();
        setCommands((previewState: CommandI[]) => [...previewState, { str: `${_error}`, status: CommandStatus.ERROR, date: dateNow }])
    }

    function open() {
        startAppCommand(deviceActive, packageActive, packageMainActivity, data => {
            setCommandInfo('Command Start App...');
            setCommandInfo('Close Start App...');
        },
            _error => setCommandError(`Command start error: "${_error}"`),
            () => setCommandInfo('Close Start App...'))
    }


    function close() {
        stopAppCommand(deviceActive, packageActive, data => {
            setCommandInfo('Command Close App...');
        },
            _error => setCommandError(`Command close error: "${_error}"`),
            () => setCommandInfo('Finish close App...'))
    }

    function clear() {
        cleanCommand(deviceActive, packageActive, data => setCommandInfo('Clear data app...'),
            _error => {
                setCommandError(`Command clear error: "${_error}"`)
            }, () => setCommandInfo('Finish clear App...')
        )
    }

    function clearAndRestart() {
        cleanAndRestartCommand(deviceActive, packageActive, packageMainActivity, data => setCommandInfo('Start clear and restart App...'),
            _error => setCommandError(`Command clear and restart error: "${_error}"`)
            , () => setCommandInfo('Finish clear and restart App...'))
    }

    async function getTheListDevices() {
        const platformName = await platform();

        // Get Android Devices
        let androidDevices: Device[] = [];
        getListDevices(data => {
            let device = getTypeAndModelDevice(data);
            if (device) {
                if (!devices.find(item => item.id === device?.id) && device.id != '')
                    androidDevices.push(device);
            }
        },
            _error => setCommandError(`Command get list devices error: "${_error}"`), () => {
                setDevices((prev) => {
                    let resultFilterDevices = androidDevices.filter(item => !prev.find(element => element.id == item.id))
                    return [...prev, ...resultFilterDevices]
                })
                setCommandInfo('Get Android devices...')
            });


        // Get IOS Devices
        let iosDevices: Device[] = [];
        let jsonResult = '';
        if (platformName == 'darwin') {
            getListIOSDevices(data => {
                jsonResult += data;
            },
                _error => setCommandError(`Command get list devices error: "${_error}"`),
                () => {
                    setCommandInfo('Get IOS devices...')
                    for (const key in JSON.parse(jsonResult).devices) {
                        if (Object.prototype.hasOwnProperty.call(JSON.parse(jsonResult).devices, key)) {
                            const elements = JSON.parse(jsonResult).devices[key] as IosDeviceFromSimctlJson;
                            if (Array.isArray(elements)) {
                                iosDevices = elements.map(item => getTypeAndModelDeviceIOS(item))
                            }
                        }
                    }
                    setDevices((prev) => {
                        let resultFilterIosDevices = iosDevices.filter(item => !prev.find(element => element.id == item.id))
                        return [...prev, ...resultFilterIosDevices]
                    });
                });
        }

    }

    function openShellAdb() {
        openShellOnDevice(deviceActive.id, data => {
        },
            _error => setCommandError(`Command open shell error: "${_error}"`), () => setCommandInfo('Open Shell of device...'))
    }

    function removeTheApp(packageActive: string, callBackSucces: () => void, callBackError?: () => void) {
        setIsLoadingCommand(true);
        removeApp(deviceActive, packageActive, data => {
            setCommandInfo(`Uninstall ${packageActive} on the device ${deviceActive.name}  ...`);
            setIsLoadingCommand(false);
        },
            _error => {
                setCommandError(`Command remove error: "${_error}"`);
                if (callBackError) callBackError();
            }, close => {
                setIsLoadingCommand(false);
                if (callBackSucces) callBackSucces();
                setCommandInfo(`Close command uninstall....`)
            })
    }

    function reverseConnectionAdb(portService: number, portDevice: number) {
        setIsLoadingCommand(true);
        reverseConnection(deviceActive.id, portService, portDevice, data => {
            setCommandInfo(`Complete reverse tcp:${[portService]} tcp:${portDevice}...`)
            setIsLoadingCommand(false);
        },
            _error => {
                setCommandError(`Command reverse error: "${_error}"`)
                setIsLoadingCommand(false);
            }, close => {
                setCommandInfo(`Finish reverse tcp:${[portService]} tcp:${portDevice}....`);
                setIsLoadingCommand(false);
            })
    }


    const defaultValue = {
        devices,
        commands,
        deviceActive,
        isLoadingCommand,
        setIsLoadingCommand: (value: boolean) => setIsLoadingCommand(value),
        setDeviceActive: (data: Device) => setDeviceActive(data),
        removeTheApp: (packageActive: string, callBackSucces: () => void, callBackError?: () => void) => removeTheApp(packageActive, callBackSucces, callBackError),
        packageActive,
        packageMainActivity,
        setCommands: (data: CommandI[]) => setCommands(data),
        setPackageMainActivity: (data: string) => setPackageMainActivity(data),
        setPackageActive: (data: string) => setPackageActive(data),
        reverseConnectionAdb: (portService: number, portDevice: number) => reverseConnectionAdb(portService, portDevice),
        openApp: () => open(),
        closeApp: () => close(),
        clearApp: () => clear(),
        openShellAdb: () => openShellAdb(),
        clearAndRestartApp: () => clearAndRestart(),
        getTheListDevices: () => getTheListDevices(),
    };


    return (
        <CommandsContext.Provider value={defaultValue} >
            {props.children}
        </CommandsContext.Provider>
    );
};

export const useCommands = () => useContext(CommandsContext);