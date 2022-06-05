import React, { FunctionComponent } from 'react'

type Props = {
    title: string;
    subTitle?: string;
    placeholderSearch?: string;
    onChangeSearch: (str: string) => void;
    onBack?: () => void;
    onClear?: () => void;
    onUpdate?: () => void;
    hiddenBack?: boolean;
    showUpdateAction?: boolean;
    isLoadingUpdate?: boolean;
    showSearch?: boolean;
    showClearAction?: boolean;
}

const Header: FunctionComponent<Props> = (props) => {

    return (
        <div className="cont-header-main flex justify-between items-center drop-shadow-sm w-full  bg-slate-100 dark:bg-gray-700 p-2">
            {!props.hiddenBack && <div className="cont-header-back flex">
                <button className='text-gray-500 dark:text-white p-2' onClick={props.onBack} ><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg></button>
            </div>}
            <div className='header-title flex ' >
                <h4 className='text-sm text-gray-500 dark:text-white' >{props.title}</h4>
                {props.subTitle && <p className='sub-title text-xs text-gray-500 dark:text-white' >{props.subTitle}</p>}
            </div>
            <div className="cont-header-actions flex ">
                {props.showClearAction && <button className='text-gray-500 dark:text-white p-1' onClick={props.onClear} >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>}
                {props.showUpdateAction && <button className='bg-slate-500 dark:bg-gray-800 rounded-full text-white p-1 drop-shadow-md' onClick={props.onUpdate} >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${props.isLoadingUpdate ? 'animate-spin' : 'animate-none'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>}
            </div>
            {props.showSearch && <div className="cont-header-search flex ">
                <label className="relative block">
                    <span className="sr-only">Search</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" onChange={(event) => { props.onChangeSearch(event.target.value); }} name="search" />
                </label>
            </div>}
        </div>
    )
}

export default Header;