import { FunctionComponent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
//
import Header from '../components/Layout/Header'
import { useCommands } from '../context/commandsContexts'

type Props = {}

const ConfigurationsScreen: FunctionComponent<Props> = () => {
    const navigate = useNavigate();
    const { commands, setCommands } = useCommands()

    useEffect(() => {
        return () => {
        }
    }, [])


    function clearCommands() {
        setCommands([]);
    }

    return (
        <div>
            <Header showClearAction={false} onClear={clearCommands} hiddenBack={false} onChangeSearch={() => { }} title='Configuration' onBack={() => navigate('/')} />
            <div className='flex justify-center items-center' >
                <p className='text-gray-500 dark:text-white mt-10' >No data.</p>
            </div>
         </div>
    )
}

export default ConfigurationsScreen;