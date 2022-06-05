import React, { createContext, useContext, useState } from 'react';
import { CommandStatus } from '../types/enums/commands';
import { CommandI } from '../types/models/commands';
import { cleanAndRestartCommand, cleanCommand, getListPackets, startAppCommand, stopAppCommand } from '../utils/Commands';



export const CommandsContext = createContext({
    commands: [] as CommandI[],
    packageActive: '', 
    setCommands: (t: any) => {},
    setPackageActive: (value: string) => { }, 
    openApp: () => { },
    closeApp: () => { },
    clearApp: () => { },
    clearAndRestartApp: () => { }
});


export const CommandsProvider = (props: any) => {

    const [commands, setCommands] = useState([] as CommandI[]);
    const [packageActive, setPackageActive] = useState('')


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


    const defaultValue = {
        commands,
        packageActive, 
        setCommands: (data: CommandI[]) => setCommands(data),
        setPackageActive: (data: string) => setPackageActive(data), 
        openApp: () => open(),
        closeApp: () => close(),
        clearApp: () => clear(),
        clearAndRestartApp: () => clearAndRestart(), 
    };
    return (
        <CommandsContext.Provider value={defaultValue} >
            {props.children}
        </CommandsContext.Provider>
    );
};

export const useCommands = () => useContext(CommandsContext);