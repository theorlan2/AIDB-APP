import React, { FunctionComponent } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useCommands } from '../../context/commandsContexts';
import Drawer from './Drawer';
import Header from './Header';

type Props = {
};

const Layout: FunctionComponent<Props> = (props) => {

    const navigate = useNavigate();
    const { packageActive, openApp, closeApp, clearApp, clearAndRestartApp } = useCommands();

    async function action(name: string) { 
        switch (name) {
            case 'listPackets': 
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
        }
    }

    return (
        <div className="App">
            <Drawer packageName={packageActive} packageActive={packageActive ? true : false} action={action} />
            <main className='flex-auto bg-slate-100 dark:bg-gray-800 h-screen  app-main overflow-scroll' >
                <Outlet />
            </main>
        </div>
    )
}


export default Layout
