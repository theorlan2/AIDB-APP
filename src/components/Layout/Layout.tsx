import React, { FunctionComponent, useState } from 'react'
import { connect } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
//
import { useCommands } from '../../context/commandsContexts';
import { RootState } from '../../store';
import DialogAlertRemove from '../dialogs/DialogAlertRemove';
import DialogEditActiviy from '../dialogs/DialogEditActiviy';
import DialogLoading from '../dialogs/DialogLoading';
import Drawer from './Drawer';


interface StateProps {
    locationPrintScreens: string;
    locationRecordScreen: string;
    portServiceReverse: number;
    portDeviceReverse: number;

}

interface DispatchProps { }

interface OwnProps { };

type Props = StateProps & DispatchProps & OwnProps;

const Layout: FunctionComponent<Props> = (props) => {
    const [showDialogAlertRemove, setShowDialogAlertRemove] = useState(false);
    const [showDialogEditActivty, setShowDialogChangeActivty] = useState(false);
    const navigate = useNavigate();
    const {
        packageActive,
        packageMainActivity,
        devices,
        isLoadingCommand,
        openApp,
        closeApp,
        clearApp,
        clearAndRestartApp,
        getTheListDevices,
        setPackageActive,
        setPackageMainActivity,
        openShellAdb,
        setDeviceActive,
        reverseConnectionAdb,
        removeTheApp
    } = useCommands();

    async function action(name: string, value?: string) {
        switch (name) {
            case 'listPackets':
                navigate('/packages')
                break;
            case 'backToList':
                setPackageActive('');
                navigate('/packages')
                break;

            case 'startApp':
                openApp()
                break;

            case 'stopApp':
                closeApp();
                break;

            case 'clean':
                clearApp();
                break;

            case 'cleanAndRestart':
                clearAndRestartApp();
                break;

            case 'openConfiguration':
                navigate('configuration');
                break;

            case 'getTheListDevices':
                getTheListDevices();
                break;
            case 'setDeviceActive':
                let device = devices.find(item => item.id === value);
                if (device) {
                    setDeviceActive(device);
                }
                break;
            case 'openShellAdb':
                openShellAdb();
                break;
            case 'reverseConnectionAdb':
                reverseConnectionAdb(props.portServiceReverse, props.portDeviceReverse);
                break;
            case 'removeTheApp':
                setShowDialogAlertRemove(true);
                break;
            case 'changeActivity':
                setShowDialogChangeActivty(true);
                break;
        }
    }

    return (
        <div className="App">
            <Drawer devices={devices} packageName={packageActive} packageActive={packageActive ? true : false} action={action} />
            <main className='flex-auto bg-slate-100 dark:bg-gray-800 h-screen  app-main overflow-auto' >
                <Outlet />
                <DialogAlertRemove isOpen={showDialogAlertRemove} packageName={packageActive} onAccept={() => {
                    removeTheApp(packageActive, () => { action('backToList'); });
                    setShowDialogAlertRemove(false);
                }} closeModal={() => { setShowDialogAlertRemove(false); }} />
                <DialogLoading isOpen={isLoadingCommand} title={'Loading command'} description={'Loading command data. This process may take a few seconds...'} />
                <DialogEditActiviy isOpen={showDialogEditActivty} onAccept={(name) => { setPackageMainActivity(name); setShowDialogChangeActivty(false) }} packageName={packageActive} activityName={packageMainActivity} closeModal={() => setShowDialogChangeActivty(false)} />
            </main>
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


export default connect(mapStateToProps)(Layout);