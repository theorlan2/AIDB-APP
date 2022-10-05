import React, { createContext, useContext, useState } from 'react';
import { CommandStatus } from '../types/enums/commands';
import { CommandI } from '../types/models/commands';
import { cleanAndRestartCommand, cleanCommand, getListDevices, openShellOnDevice, reverseConnection, startAppCommand, stopAppCommand } from '../utils/Commands';
import { getTypeAndModelDevice } from '../utils/getListDevices';



export const CommandsContext = createContext({
    commands: [] as CommandI[],
    devices: [] as any[],
    deviceActive: '',
    setDeviceActive: (value: string) => { },
    packageActive: '',
    getTheListDevices: () => { },
    setPackageActive: (value: string) => { },
    openApp: () => { },
    setCommands: (t: any) => { },
    openShellAdb: () => { },
    closeApp: () => { },
    clearApp: () => { },
    clearAndRestartApp: () => { },
    reverseConnectionAdb: () => { }
});


export const CommandsProvider = (props: any) => {

    const [devices, setDevices] = useState([] as { id: string, name: string }[]);
    const [commands, setCommands] = useState([] as CommandI[]);
    const [packageActive, setPackageActive] = useState('')
    const [deviceActive, setDeviceActive] = useState('')


    function open() {
        startAppCommand(packageActive, data => {
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
                setCommands((previewState: CommandI[]) => [...previewState, { str: `Command clear error: "${_error}"`, status: CommandStatus.ERROR, date: new Date().toDateString() }])
            }, close => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: 'Finish clear App...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
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
                setCommands((previewState: CommandI[]) => [...previewState, { str: `Command clear error: "${_error}"`, status: CommandStatus.ERROR, date: new Date().toDateString() }])
            }, close => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: 'Finish clear App...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
            })
    }

    function openShellAdb() {
        openShellOnDevice(deviceActive, data => {
            console.log('ee', data);
        },
            _error => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: `Command clear error: "${_error}"`, status: CommandStatus.ERROR, date: new Date().toDateString() }])
            }, close => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: 'Finish clear App...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
            })
    }

    function reverseConnectionAdb() {
        reverseConnection(deviceActive, data => {
            console.log('ee', data);
        },
            _error => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: `Command clear error: "${_error}"`, status: CommandStatus.ERROR, date: new Date().toDateString() }])
            }, close => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: 'Finish clear App...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
            })
    }


    const defaultValue = {
        devices,
        commands,
        deviceActive,
        setDeviceActive: (data: string) => setDeviceActive(data),
        packageActive,
        setCommands: (data: CommandI[]) => setCommands(data),
        setPackageActive: (data: string) => setPackageActive(data),
        reverseConnectionAdb: () => reverseConnectionAdb(),
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