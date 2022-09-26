import { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputLocation from '../components/Configuration/InputLocation'

//
import Header from '../components/Layout/Header'
import { useCommands } from '../context/commandsContexts'
import { openDialogSelectDirectory } from '../utils/Dialogs'

type Props = {}

const ConfigurationsScreen: FunctionComponent<Props> = () => {
    const navigate = useNavigate();
    const { commands, setCommands } = useCommands()
    const [locaionPrintScreens, setLocaionPrintScreens] = useState('-')
    const [locaionRecordScreen, setLocaionRecordScreen] = useState('-')

    useEffect(() => {
        return () => {
        }
    }, [])

    function clearCommands() {
        setCommands([]);
    }

    async function openDialogSelectDirectoryPrintScreens() {
        const dir = await openDialogSelectDirectory();
        setLocaionPrintScreens(dir);
    }



    async function openDialogSelectDirectoryRecordScreens() {
        const dir = await openDialogSelectDirectory();
        setLocaionRecordScreen(dir);
    }



    return (
        <div>
            <Header showClearAction={false} onClear={clearCommands} hiddenBack={false} onChangeSearch={() => { }} title='Configuration' onBack={() => navigate('/')} />
            <div className='flex flex-col px-2 ' >
                <InputLocation title='Location to save Print Screens' locaion={locaionPrintScreens} openDialog={openDialogSelectDirectoryPrintScreens} />
                <InputLocation title='Location to save Record Screens' locaion={locaionRecordScreen} openDialog={openDialogSelectDirectoryRecordScreens} />

                <div className='flex flex-col' >
                    <h4 className=' text-gray-500 dark:text-white' >Reverse Ports</h4>

                </div>

            </div>



        </div>
    )
}

export default ConfigurationsScreen;