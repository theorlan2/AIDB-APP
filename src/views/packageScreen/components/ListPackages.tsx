import React, { FunctionComponent } from 'react'

interface Props {
    packages: string[];
    haveError?: boolean;
    errorText?: string;
    selectPackage: (str: string) => void;
}


export const ListPackages: FunctionComponent<Props> = (props) => {

    return (
        <div className='cont-list-packages flex flex-col' >
            <ul className='ul-list-packages list-none p-0' >
                {props.packages.map((item) => <li key={item + '-item'} className='element-package 
                 border-y first:border-t-0  border-slate-200 dark:border-white w-full inline-block pl-2
                ' ><button className='py-3 inline-block border-none w-full bg-transparent text-left cursor-pointer text-gray-500  dark:text-white' onClick={() => { props.selectPackage(item); }} >{item}</button></li>)}
            </ul>

            {props.haveError && <div className=' flex flex-row items-center' >
                <span className='basis-6'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg></span>
                <button className={` flex text-left  text-red-500`} onClick={() => { }} >{props.errorText}</button>
            </div>}
        </div>
    )
}
