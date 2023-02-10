import { FunctionComponent } from 'react'
//
import { CommandList } from '../../components/commons/CommandList'
import Header from '../../components/Layout/Header'
import { useCommands } from '../../context/commandsContexts'

type Props = {}

const CommandsListScreen: FunctionComponent<Props> = () => {

    const { commands, setCommands } = useCommands()
  
    function clearCommands() {
        setCommands([]);
    }

    return (
        <div>
            <Header showClearAction={true} justifyBetween={true} onClear={clearCommands} hiddenBack={true} fixed onChangeSearch={() => { }} title='Commands List' />
            <div className='pt-12' >
                <CommandList items={commands} selectItem={(str) => { }} />
            </div>
        </div>
    )
}

export default CommandsListScreen;