import React, { FunctionComponent, useEffect, useState } from 'react'
import { CameraIcon, VideoCameraIcon, CommandLineIcon, TrashIcon, ArrowsRightLeftIcon, CubeIcon, ArrowLeftIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
//
import logo from '../../../assets/logo.png'
import logoWhite from '../../../assets/logo_white.png'
import SelectDevice from './SelectDevice';


type Props = {
    devices: { id: string, name: string }[];
    packageActive: boolean;
    packageName: string;
    action: (name: string, value?: string) => void;
}

const Drawer: FunctionComponent<Props> = (props) => {
    const [isLoadingPhones, setIsLoadingPhones] = useState(false)
    const [selected, setSelected] = useState({ id: '0' });
    const listActions = [
        {
            name: 'Print Screen',
            disabled: true,
            child: <CameraIcon className="h-5 w-10 " />,
            action: () => { }
        },
        {
            name: 'Screen Record',
            disabled: true,
            child: <VideoCameraIcon className="h-5 w-10 " />,
            action: () => { }
        },
        {
            name: 'Commands Device',
            disabled: false,
            child: <CommandLineIcon className="h-5 w-10 " />,
            action: () => { props.action('openShellAdb') }
        },
        {
            name: 'Remove App',
            disabled: !props.packageActive,
            child: <TrashIcon className="h-5 w-10 " />,
            action: () => { props.action('removeTheApp') }
        },
        {
            name: 'Reverse to RN',
            disabled: false,
            child: <ArrowsRightLeftIcon className="h-5 w-10 " />,
            action: () => { props.action('reverseConnectionAdb') }
        }
    ]

    useEffect(() => {
        updateListDevices();
    }, [])

    function updateListDevices() {
        setIsLoadingPhones(true);
        props.action('getTheListDevices');
        setTimeout(() => {
            setIsLoadingPhones(false);
        }, 1000)
    }

    return (
        <header className="w-72 relative float-left h-screen px-3 shadow-md bg-slate-200 dark:bg-gray-600 text-center box-border">
            <div className='text-right mt-2' >
                {/* <button className='rounded-full bg-slate-500 text-white dark:bg-gray-800 p-1 mx-2 ' onClick={() => setScheme(isDark ? 'light' : 'dark')}  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </button> */}
                <button onClick={() => props.action('openConfiguration')} className='rounded-full bg-slate-500 text-white p-1 hover:bg-slate-600 dark:bg-gray-800 hover:dark:bg-slate-900 '  ><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg></button>
            </div>
            <img src={logo} className="App-logo block dark:hidden m-auto w-24" alt="logo" />
            <img src={logoWhite} className="App-logo hidden dark:block m-auto  w-24" alt="logo" />

            <div className='select-device flex justify-between' >
                <button onClick={updateListDevices} className='mr-4 py-2 rounded hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900 ' >
                    <ArrowPathIcon className={`h-5 w-10 ${isLoadingPhones ? 'animate-spin' : 'animate-none'}`} />
                </button>

                <div className="flex w-full">
                    <SelectDevice devices={props.devices} onChange={(value) => { setSelected(value); props.action('setDeviceActive', value.id); }} />
                </div>
            </div >

            <div className="list-actions flex flex-nowrap w-full justify-between my-2">
                {listActions.map((item) =>
                    <button disabled={item.disabled} onClick={item.action} role={'button'} className={`my-2 py-2 rounded hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-90 tooltip  ${item.disabled && 'opacity-70'}`} >
                        {item.child}
                        <span className="tooltiptext absolute z-50 mt-3 invisible bg-black text-white text-center rounded px-2 py-1">{item.name}</span>
                    </button>
                )}
            </div>

            {props.packageActive && <div className="cont-package-name text-left mb-3 z-0">
                <h3 className='text-sm font-bold text-gray-500 dark:text-white' >Package active:  </h3>
                <div className='flex items-center text-gray-500 dark:text-white opacity-80 uppercase z-0' >
                    <CubeIcon className='h-5 w-5 mr-1' /><p className='package-name text-xs font-bold dark:text-white z-0' >{props.packageName}</p>
                </div>
            </div>
            }
            <div className="cont_buttons">
                {!props.packageActive && selected && selected.id !== '0' && <button type="button" className='my-2 d-block w-full  h-10 px-6 font-semibold text-sm rounded hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900 ' onClick={() => { props.action('listPackets') }}> GET PACKAGE LIST </button>}
                {props.packageActive && <button type="button" className='my-2 d-block w-full  h-10 px-6 font-semibold text-sm rounded flex justify-center items-center transition hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900' onClick={() => { props.action('backToList'); }}>
                    <ArrowLeftIcon className='h-4 w-4 mr-2' />
                    BACK TO LIST</button>}
                {props.packageActive && <button type="button" className='my-2 d-block w-full  h-10 px-6 font-semibold text-sm rounded transition hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900' onClick={() => { props.action('startApp'); }}>START APPLICATION</button>}
                {props.packageActive && <button type="button" className='my-2 d-block w-full  h-10 px-6 font-semibold text-sm rounded transition hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900' onClick={() => { props.action('stopApp'); }}>STOP APP</button>}
                {props.packageActive && <button type="button" className='my-2 d-block w-full  h-10 px-6 font-semibold text-sm rounded transition hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900' onClick={() => { props.action('clean'); }}>CLEAN DATA</button>}
                {props.packageActive && <button type="button" className='my-2 d-block w-full  h-10 px-6 font-semibold text-sm rounded transition hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900' onClick={() => { props.action('cleanAndRestart'); }}>CLEAN DATA AND RESTART</button>}
            </div>
        </header >
    )
}

export default Drawer;