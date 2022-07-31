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
            <Header showClearAction={false} onClear={clearCommands} hiddenBack={false} onChangeSearch={() => { }} title='Configuracion' onBack={() => navigate('/')} />
            <div className='flex justify-center items-center' >
                <p>No data.</p>
            </div>
         </div>
    )
}

export default ConfigurationsScreen;