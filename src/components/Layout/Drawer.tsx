import React, { FunctionComponent } from 'react'
import logo from '../../assets/logo.png'
import logoWhite from '../../assets/logo_white.png'

type Props = {
    packageActive: boolean;
    packageName: string;
    action: (name: string) => void;
}

const Drawer: FunctionComponent<Props> = (props) => {

    return (
        <header className="w-72 relative float-left h-screen px-3 shadow-md bg-slate-200 dark:bg-gray-600 text-center box-border">
            <div className='text-right mt-2' >
                {/* <button className='rounded-full bg-slate-500 text-white dark:bg-gray-800 p-1 mx-2 ' onClick={() => setScheme(isDark ? 'light' : 'dark')}  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </button> */}
                <button className='rounded-full bg-slate-500 text-white p-1 hover:bg-slate-600 dark:bg-gray-800 hover:dark:bg-slate-900 '  ><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg></button>
            </div>
            <img src={logo} className="App-logo block dark:hidden m-auto" alt="logo" />
            <img src={logoWhite} className="App-logo hidden dark:block m-auto" alt="logo" />
            {props.packageActive && <div className="cont-package-name text-left mb-2">
                <h3 className='text-base text-gray-500 dark:text-white' >Package: <p className='package-name text-xs dark:text-white font-bold' >{props.packageName}</p></h3>
            </div>}
            <p className='text-title text-gray-500 dark:text-white text-lg uppercase font-medium' >Android ADB Commands</p>
            <div className="cont_buttons">
                <button type="button" className='my-2 d-block w-full  h-10 px-6 font-semibold text-sm rounded hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900 ' onClick={() => { props.action('listPackets') }}>
                    LISTA DE PAQUETES
                </button>
                {props.packageActive && <button type="button" className='my-2 d-block w-full  h-10 px-6 font-semibold text-sm rounded transition hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900' onClick={() => { props.action('startApp'); }}>INICIAR APLICACION</button>}
                {props.packageActive && <button type="button" className='my-2 d-block w-full  h-10 px-6 font-semibold text-sm rounded transition hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900' onClick={() => { props.action('stopApp'); }}>DENTENER</button>}
                {props.packageActive && <button type="button" className='my-2 d-block w-full  h-10 px-6 font-semibold text-sm rounded transition hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900' onClick={() => { props.action('clean'); }}>LIMPIAR DATOS</button>}
                {props.packageActive && <button type="button" className='my-2 d-block w-full  h-10 px-6 font-semibold text-sm rounded transition hover:bg-slate-600 bg-slate-500 dark:bg-gray-800 text-white hover:dark:bg-slate-900' onClick={() => { props.action('cleanAndRestart'); }}>LIMPIAR DATOS Y REINICIAR</button>}
            </div>
        </header>
    )
}

export default Drawer;