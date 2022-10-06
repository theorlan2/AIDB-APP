import { FunctionComponent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Dispatch } from 'redux'
//
import InputLocation from '../components/Configuration/InputLocation'
import Header from '../components/Layout/Header'
import { useCommands } from '../context/commandsContexts'
import { RootState } from '../store'
import { setLocationPrintScreens, setLocationRecordScreens, setPortDeviceReverse, setPortServiceReverse } from '../store/feactures/configuration/configurationSlice'
import { openDialogSelectDirectory } from '../utils/Dialogs'


interface StateProps {
    locationPrintScreens: string;
    locationRecordScreen: string;
    portServiceReverse: number;
    portDeviceReverse: number;

}

interface DispatchProps {
    setLocationPrintScreens: (location: string) => void;
    setLocationRecordScreens: (location: string) => void;
    setPortServiceReverse: (port: number) => void;
    setPortDeviceReverse: (port: number) => void;
}

interface OwnProps { };

type Props = StateProps & DispatchProps & OwnProps;


const ConfigurationsScreen: FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();
    const { setCommands } = useCommands()
    const [locaionPrintScreens, setLocaionPrintScreens] = useState('-')
    const [locaionRecordScreen, setLocaionRecordScreen] = useState('-')
    const [reversePortService, setReversePortService] = useState('8081')
    const [reversePortDevice, setReversePortDevice] = useState('8081')


    useEffect(() => {
        setLocaionPrintScreens(props.locationPrintScreens);
        setLocaionRecordScreen(props.locationRecordScreen);
        setReversePortService(props.portServiceReverse.toString());
        setReversePortDevice(props.portDeviceReverse.toString());
        () => {
            props.setPortServiceReverse(+reversePortService);
            props.setPortDeviceReverse(+reversePortDevice);
        }
    }, []);

    function clearCommands() {
        setCommands([]);
    }

    async function openDialogSelectDirectoryPrintScreens() {
        const dir = await openDialogSelectDirectory();
        if (typeof dir == 'string') {
            setLocaionPrintScreens(dir);
            props.setLocationPrintScreens(dir);
        }
    }
 
    async function openDialogSelectDirectoryRecordScreens() {
        const dir = await openDialogSelectDirectory();
        if (typeof dir == 'string') {
            setLocaionRecordScreen(dir);
            props.setLocationRecordScreens(dir);
        }
    }



    return (
        <div>
            <Header showClearAction={false} onClear={clearCommands} hiddenBack={false} onChangeSearch={() => { }} title='Configuration' onBack={() => navigate('/')} />
            <div className='flex flex-col px-2 ' >
                <InputLocation title='Location to save Print Screens' locaion={locaionPrintScreens} openDialog={openDialogSelectDirectoryPrintScreens} />
                <InputLocation title='Location to save Record Screens' locaion={locaionRecordScreen} openDialog={openDialogSelectDirectoryRecordScreens} /> 
                <div className='flex flex-col' >
                    <h4 className=' text-gray-500 dark:text-white' >Reverse Ports</h4>
                    <div className="flex justify-between">
                        <input onChange={(e) => setReversePortService(e.target.value)} value={reversePortService} className='px-2 py-1 mr-1 w-full rounded' />
                        <input onChange={(e) => setReversePortDevice(e.target.value)} value={reversePortDevice} className='px-2 py-1 ml-1 w-full rounded' />
                    </div>
                </div>
            </div>
        </div>
    )
}



const mapStateToProps = (state: RootState) => {
    const {
        configuration
    } = state
    return {
        locationPrintScreens: configuration.locationPrintScreens,
        locationRecordScreen: configuration.locationRecordScreens,
        portServiceReverse: configuration.portServiceReverse,
        portDeviceReverse: configuration.portDeviceReverse,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        dispatch,
        setLocationPrintScreens: (location: string) => dispatch(setLocationPrintScreens(location)),
        setLocationRecordScreens: (location: string) => dispatch(setLocationRecordScreens(location)),
        setPortServiceReverse: (port: number) => dispatch(setPortServiceReverse(port)),
        setPortDeviceReverse: (port: number) => dispatch(setPortDeviceReverse(port))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationsScreen);