import React, { FunctionComponent } from 'react'
import './style.css';

type Props = {
    onInput: (str: string) => void;
}

const FilterPackages: FunctionComponent<Props> = (props) => {
    return (
        <div className='form-group' >
            <input type="text" placeholder='Filtrar paquetes'  onChange={(event) => {props.onInput(event.target.value);}} className='input-text'  />
        </div>
    )
}

export default FilterPackages