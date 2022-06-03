import React, { FunctionComponent, useEffect, useState } from 'react'
import FilterPackages from '../FilterPackages';
import './style.css';

interface Props {
    packages: string[];
    selectPackage: (str: string) => void;
}


export const ListPackages: FunctionComponent<Props> = (props) => {

    const [listPackages, setListPackets] = useState([] as string[])

    useEffect(() => {
        setListPackets(props.packages);
    },[props.packages])

    function filterPackage(search_term: string) {
        let result = props.packages.filter((item) => item.toLowerCase().indexOf(search_term) !== -1);
        setListPackets(result);
    }

    return (
        <div className='cont-list-packages' >
            <div className="cont-title-list-pakages">
                <div>
                <h3>Lista de paquetes</h3>
                <p>Seleciona el paquete que vas a utilizar.</p>
                </div>
                <FilterPackages onInput={filterPackage} />
            </div>
            <ul className='ul-list-packages' >
                {listPackages.map((item) => <li key={item+'-item'} className='element-package' ><button onClick={() => { props.selectPackage(item); }} >{item}</button></li>)}
            </ul>
        </div>
    )
}
