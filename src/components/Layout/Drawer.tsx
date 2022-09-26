import React, { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, DevicePhoneMobileIcon, CameraIcon, VideoCameraIcon, CommandLineIcon, TrashIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
//
import logo from '../../assets/logo.png'
import logoWhite from '../../assets/logo_white.png'
type Props = {
    devices: { id: string, name: string }[];
    packageActive: boolean;
    packageName: string;
    action: (name: string) => void;
}

const Drawer: FunctionComponent<Props> = (props) => {
    useEffect(() => {
        props.action('getTheListDevices');
    }, [])
    const [devices, setDevices] = useState([
        { id: '0', name: 'Select device...', description: '', isDevice: false },
    ])
    const [selected, setSelected] = useState(devices[0])


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

            <div className='select-device' >
                <Listbox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-8 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="pointer-events-none absolute inset-y-0 left-1 flex items-center pr-2">
                                <DevicePhoneMobileIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                            <span className="block truncate">{selected.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-1 max-h-screen w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {props.devices.map((device, deviceIdx) => (
                                    <Listbox.Option
                                        key={deviceIdx}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-5 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                            }`
                                        }
                                        value={device}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <div className="py-1 max-w-sm mx-auto flex items-center ">
                                                    <div className="shrink-0 px-2">
                                                        <DevicePhoneMobileIcon
                                                            className="h-5 w-5 text-gray-400"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                    <div className='text-left' >
                                                        <div className="text-sm font-medium text-black">{device.name}</div>
                                                        <p className="text-slate-500" >{device.id}</p>
                                                    </div>
                                                </div>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition >
                    </div >
                </Listbox >
            </div >

            <div className="list-actions flex flex-nowrap w-full justify-between my-2">
                <button className='my-2 py-2 rounded hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900' >
                    <CameraIcon className="h-5 w-10 " />
                </button>
                <button className='my-2 py-2 rounded hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900' >
                    <VideoCameraIcon className="h-5 w-10 " />
                </button>
                <button className='my-2 py-2 rounded hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900' >
                    <CommandLineIcon className="h-5 w-10 " />
                </button>
                <button className='my-2 py-2 rounded hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900' >
                    <TrashIcon className="h-5 w-10 " />
                </button>
                <button className='my-2 py-2 rounded hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900' >
                    <ArrowsRightLeftIcon className="h-5 w-10 " />
                </button>
            </div>


            {
                props.packageActive && <div className="cont-package-name text-left mb-2">
                    <h3 className='text-xs font-bold text-gray-500 dark:text-white' >Package: <p className='package-name text-base dark:text-white font-light ' >{props.packageName}</p></h3>
                </div>
            }
            <div className="cont_buttons">
                <button type="button" className='my-2 d-block w-full  h-10 px-6 font-semibold text-sm rounded hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900 ' onClick={() => { props.action('listPackets') }}>
                    GET PACKAGE LIST
                </button>
                {props.packageActive && <button type="button" className='my-2 d-block w-full  h-10 px-6 font-semibold text-sm rounded transition hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900' onClick={() => { props.action('startApp'); }}>START APPLICATION</button>}
                {props.packageActive && <button type="button" className='my-2 d-block w-full  h-10 px-6 font-semibold text-sm rounded transition hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900' onClick={() => { props.action('stopApp'); }}>STOP APP</button>}
                {props.packageActive && <button type="button" className='my-2 d-block w-full  h-10 px-6 font-semibold text-sm rounded transition hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900' onClick={() => { props.action('clean'); }}>CLEAN DATA</button>}
                {props.packageActive && <button type="button" className='my-2 d-block w-full  h-10 px-6 font-semibold text-sm rounded transition hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900' onClick={() => { props.action('cleanAndRestart'); }}>CLEAN DATA AND RESTART</button>}
            </div>
        </header >
    )
}

export default Drawer;