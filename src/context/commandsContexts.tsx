import React, { createContext, useContext, useState } from 'react';
import { CommandStatus } from '../types/enums/commands';
import { CommandI } from '../types/models/commands';
import { cleanAndRestartCommand, cleanCommand, getListDevices, openShellOnDevice, removeApp, reverseConnection, startAppCommand, stopAppCommand } from '../utils/Commands';
import { getTypeAndModelDevice } from '../utils/getListDevices';


export const CommandsContext = createContext({
    commands: [] as CommandI[],
    devices: [] as any[],
    deviceActive: '',
    isLoadingCommand: false,
    setIsLoadingCommand: (value: boolean) => { },
    setDeviceActive: (value: string) => { },
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
    const [devices, setDevices] = useState([] as { id: string, name: string }[]);
    const [commands, setCommands] = useState([] as CommandI[]);
    const [packageActive, setPackageActive] = useState('');
    const [packageMainActivity, setPackageMainActivity] = useState('MainActivity');
    const [deviceActive, setDeviceActive] = useState('');

    function open() {
        startAppCommand(packageActive, packageMainActivity, data => {
            setCommands((previewState: CommandI[]) => [...previewState, { str: 'Command Start App...', status: CommandStatus.INFO, date: new Date().toDateString() }]); setCommands((previewState: CommandI[]) => [...previewState, { str: 'Close Start App...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
        },
            _error => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: `Command start error: "${_error}"`, status: CommandStatus.ERROR, date: new Date().toDateString() }])
            }, close => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: 'Close Start App...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
            })
    }


    function close() {
        stopAppCommand(packageActive, data => {
            setCommands((previewState: CommandI[]) => [...previewState, { str: 'Command Close App...', status: CommandStatus.INFO, date: new Date().toDateString() }]); setCommands((previewState: CommandI[]) => [...previewState, { str: 'Finish Close App...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
        },
            _error => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: `Command close error: "${_error}"`, status: CommandStatus.ERROR, date: new Date().toDateString() }])
            }, close => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: 'Finish close App...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
            })
    }

    function clear() {
        cleanCommand(packageActive, data => {

        },
            _error => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: `Command clear error: "${_error}"`, status: CommandStatus.ERROR, date: new Date().toDateString() }])
            }, close => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: 'Finish clear App...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
            })
    }

    function clearAndRestart() {
        cleanAndRestartCommand(packageActive, data => {

        },
            _error => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: `Command clear and restart error: "${_error}"`, status: CommandStatus.ERROR, date: new Date().toDateString() }])
            }, close => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: 'Finish clear and restart App...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
            })
    }

    function getTheListDevices() {
        getListDevices(data => {
            let device = getTypeAndModelDevice(data);
            if (device) {
                if (!devices.find(item => item.id === device?.id) && device.id != '')
                    setDevices([...devices, device]);
            }
        },
            _error => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: `Command get list devices error: "${_error}"`, status: CommandStatus.ERROR, date: new Date().toDateString() }])
            }, close => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: 'Get devices...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
            })
    }

    function openShellAdb() {
        openShellOnDevice(deviceActive, data => {
        },
            _error => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: `Command open shell error: "${_error}"`, status: CommandStatus.ERROR, date: new Date().toDateString() }])
            }, close => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: 'Open Shell of device...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
            })
    }

    function removeTheApp(packageActive: string, callBackSucces: () => void, callBackError?: () => void) {
        setIsLoadingCommand(true);
        removeApp(deviceActive, packageActive, data => {
            setCommands((previewState: CommandI[]) => [...previewState, { str: `uninstall ${packageActive} on the device ${deviceActive}  ...`, status: CommandStatus.INFO, date: new Date().toDateString() }]);
            if (callBackSucces) callBackSucces();
            setIsLoadingCommand(false);
        },
            _error => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: `Command remove error: "${_error}"`, status: CommandStatus.ERROR, date: new Date().toDateString() }])
                if (callBackError) callBackError();
            }, close => {
                setIsLoadingCommand(false);
                setCommands((previewState: CommandI[]) => [...previewState, { str: `Close command uninstall....`, status: CommandStatus.INFO, date: new Date().toDateString() }]);
            })
    }

    function reverseConnectionAdb(portService: number, portDevice: number) {
        setIsLoadingCommand(true);
        reverseConnection(deviceActive, portService, portDevice, data => {
            setCommands((previewState: CommandI[]) => [...previewState, { str: `Complete reverse tcp:${[portService]} tcp:${portDevice}...`, status: CommandStatus.INFO, date: new Date().toDateString() }]);
            setIsLoadingCommand(false);
        },
            _error => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: `Command reverse error: "${_error}"`, status: CommandStatus.ERROR, date: new Date().toDateString() }])
                setIsLoadingCommand(false);
            }, close => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: `Finish reverse tcp:${[portService]} tcp:${portDevice}....`, status: CommandStatus.INFO, date: new Date().toDateString() }]);
                setIsLoadingCommand(false);
            })
    }


    const defaultValue = {
        devices,
        commands,
        deviceActive,
        isLoadingCommand,
        setIsLoadingCommand: (value: boolean) => setIsLoadingCommand(value),
        setDeviceActive: (data: string) => setDeviceActive(data),
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