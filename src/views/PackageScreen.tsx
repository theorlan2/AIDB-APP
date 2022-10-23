import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//
import { useCommands } from '../context/commandsContexts';
import { getListPackets } from '../utils/Commands';
import { CommandStatus } from '../types/enums/commands';
import { CommandI } from '../types/models/commands';
//
import { ListPackages } from '../components/listpakages/ListPackages';
import Header from '../components/Layout/Header';

export default function PackageScreen() {
    const navigate = useNavigate();
    const { setPackageActive, setCommands } = useCommands();
    const [packageList, setPackageList] = useState([] as string[]);
    const [isLoading, setIsLoading] = useState(false);
    const [haveError, setHaveError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [packageListFilter, setPackageListFilter] = useState([] as string[]);


    function filterPackage(search_term: string) {
        let result = packageList.filter((item) => item.toLowerCase().indexOf(search_term) !== -1);
        setPackageListFilter(result);
    }

    useEffect(() => {
        getPackageList();
    }, [])


    function getPackageList() {
        setIsLoading(true);
        setCommands((previewState: CommandI[]) => [...previewState, { str: 'List Packages...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
        let list = [] as string[];
        getListPackets(data => {
            setHaveError(false)
            let str = data.replace("package:", "").trimEnd();
            list.push(str);
            setPackageList(list as any);
            setPackageListFilter(list as any);
        },
            _error => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: `Command list package error: "${_error}"`, status: CommandStatus.ERROR, date: new Date().toDateString() }]);
                setHaveError(true)
                setIsLoading(false);
                setErrorText(`Command list package error: "${_error}"`);
            },
            close => {
                setCommands((previewState: CommandI[]) => [...previewState, { str: 'Close List Packages...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            })
    }

    return (<div className='' >
        <Header showUpdateAction={true} isLoadingUpdate={isLoading} onUpdate={getPackageList} showSearch={true} justifyBetween={true} onBack={() => { navigate('/') }} onChangeSearch={(str) => { filterPackage(str); }} title='List Packages' />
        <ListPackages haveError={haveError} errorText={errorText} packages={packageListFilter} selectPackage={(str) => { setPackageActive(str); navigate('/commands') }} />
    </div>
    )
}
