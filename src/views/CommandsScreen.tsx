import { FunctionComponent, useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
//
import { CommandList } from '../components/CommandList'
import Header from '../components/Layout/Header'
import { useCommands } from '../context/commandsContexts'
import { useNavigate } from 'react-router-dom'
type Props = {}

const CommandsScreen: FunctionComponent<Props> = () => {

    const { commands, setCommands } = useCommands()

    const navigate = useNavigate();
    useEffect(() => {
        checkIsRunPort();
        return () => {
        }
    }, [])


    function clearCommands() {
        setCommands([]);
    }

    async function checkIsRunPort() {
        invoke('check_is_port_run', { port: 5037 }).then(r => {

        })
    }


    return (
        <div>
            <Header showClearAction={true} onClear={clearCommands} hiddenBack={true} onChangeSearch={() => { }} title='Lista de comandos' />
            <CommandList items={commands} selectItem={(str) => { }} />
        </div>
    )
}

export default CommandsScreen;