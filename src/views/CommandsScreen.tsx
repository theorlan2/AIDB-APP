import { FunctionComponent, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
//
import { CommandList } from '../components/CommandList'
import Header from '../components/Layout/Header'
import { useCommands } from '../context/commandsContexts' 

type Props = {}

const CommandsScreen: FunctionComponent<Props> = () => {

    const { commands, setCommands } = useCommands()

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
            <Header showClearAction={true} onClear={clearCommands} hiddenBack={true} fixed onChangeSearch={() => { }} title='Lista de comandos' />
            <div className='pt-12' >
            <CommandList items={commands} selectItem={(str) => { }} />
            </div>
        </div>
    )
}

export default CommandsScreen;