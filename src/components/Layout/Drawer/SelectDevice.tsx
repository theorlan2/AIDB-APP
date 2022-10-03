import { Listbox, Transition } from '@headlessui/react'
import { CheckCircleIcon, ChevronUpDownIcon, DevicePhoneMobileIcon, NoSymbolIcon } from '@heroicons/react/24/outline'
import React, { Fragment, FunctionComponent, useEffect, useState } from 'react'

type Device = { id: string, name: string };

type Props = {
    devices: Device[];
    onChange: (value: Device) => void;
}

const SelectDevice: FunctionComponent<Props> = (props) => {
    const notDevice = { id: '0', name: 'Select device...', description: '', isDevice: false };
    const [selected, setSelected] = useState(notDevice)

    useEffect(() => {
        props.onChange(selected);
    }, [selected])

    return (
        <Listbox value={selected} onChange={setSelected}  >
            <div className="relative  w-full h-5">
                <Listbox.Button className="relative w-full cursor-default rounded bg-white py-2 pl-8 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
                    <Listbox.Options className="absolute mt-1 max-h-screen w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                        {props.devices.map((device, deviceIdx) => (
                            <Listbox.Option
                                key={deviceIdx}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-5 pr-4 ${active ? 'bg-slate-100 text-slate-900' : 'text-gray-900'
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
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-600">
                                                <CheckCircleIcon className="h-4 w-4" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                        {props.devices.length < 1 && <Listbox.Option
                            className='relative cursor-default select-none py-2 pl-5 pr-4  text-gray-900'
                            value={notDevice}
                        >
                            <div className="py-1 max-w-sm mx-auto flex items-center ">
                                <div className="shrink-0 px-2">
                                    <NoSymbolIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    /> </div>
                                <div className='text-left' >
                                    <div className=" text-black"><p className='text-sm font-medium' >No devices connected</p></div>
                                </div>
                            </div>
                        </Listbox.Option>}
                    </Listbox.Options>
                </Transition >
            </div >
        </Listbox >
    )
}

export default SelectDevice;