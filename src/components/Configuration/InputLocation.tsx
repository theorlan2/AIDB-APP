import React, { Fragment, FunctionComponent } from 'react'
import { ChevronDownIcon, PencilIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { Menu, Transition } from '@headlessui/react'

type Props = {
    title: string;
    locaion: string;
    openDialog: () => void;

}

const InputLocation: FunctionComponent<Props> = (props) => {

    return (
        <div className='flex flex-col my-3 ' >
            <h4 className=' text-gray-500 dark:text-white' >{props.title}</h4>
            <div className='flex  relative' >
                <input disabled value={props.locaion} className='px-2 py-1 w-full rounded' />
                <div className='p-1 absolute right-0 top-0 ' >
                    <Menu as="div" className="relative inline-block text-left -m-1.5">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center rounded bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-100">
                                <PencilIcon
                                    className="ml-2 -mr-1 h-5 w-5 text-gray-500 hover:text-gray-500"
                                    aria-hidden="true"
                                />
                                <ChevronDownIcon
                                    className="ml-2 -mr-1 h-5 w-5 text-gray-500 hover:text-gray-500"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  z-50">
                                <div className="px-1 py-1 ">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={props.openDialog}
                                                className={`${active ? 'bg-slate-500 text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded px-2 py-2 text-sm`}
                                            >
                                                <PencilIcon
                                                    className="mr-2 h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                                Edit
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-slate-500 text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded px-2 py-2 text-sm`}
                                            >
                                                <DocumentDuplicateIcon
                                                    className="mr-2 h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                                Desktop(Default)
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>

                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>

            </div>
        </div>
    )
}

export default InputLocation;