import React, { FunctionComponent } from 'react'

type Props = {
    title: string;
    subTitle?: string;
    placeholderSearch?: string;
    onChangeSearch: (str: string) => void;
    onBack: () => void;
}

const Header: FunctionComponent<Props> = (props) => {

    return (
        <div className="cont-header-main">
            <div className="cont-header-back">
                <button className='text-gray-500 dark:text-white' onClick={props.onBack} >Back</button>
            </div>
            <div className='header-title' >
                <h4 className='title' >{props.title}</h4>
                {props.subTitle && <p className='sub-title text-gray-500 dark:text-white' >{props.subTitle}</p>}
            </div>
            <div className="cont-header-search">

            </div>
            <div className="cont-header-actions">

            </div>
        </div>
    )
}

export default Header;