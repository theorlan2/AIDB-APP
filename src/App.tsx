import { useEffect, useState } from 'react'
import './css/main.css'
import { invoke } from '@tauri-apps/api/tauri'
import { Command } from '@tauri-apps/api/shell'
//
import { ListPackages } from './components/Listpakages/index'
import Header from './components/Layout/Header'
import { CommandList } from './components/CommandList'
import { CommandI } from './types/models/commands'
import { CommandStatus } from './types/enums/commands'
import Drawer from './components/Layout/Drawer'
import { cleanAndRestartCommand, cleanCommand, getListPackets, startAppCommand, stopAppCommand } from './utils/Commands'


function App() {
  const [listPackets, setListPackets] = useState([])
  const [packageActive, setPackageActive] = useState('')
  const [showListPackage, setShowListPackage] = useState(false);
  const [listCommands, setListCommands] = useState([] as CommandI[]);

  useEffect(() => {

    checkIsRunPort();
    return () => {
    }
  }, [])


  async function checkIsRunPort() {
    invoke('check_is_port_run', { port: 5037 }).then(r => {

    })
  }

  async function listThePackages() {
    setShowListPackage(true);
    setListCommands((previewState: CommandI[]) => [...previewState, { str: 'List Packages...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
    let list = [] as string[];
    getListPackets(data => {
      let str = data.replace("package:", "");
      list.push(str);
      setListPackets(list as any);
    },
      _error => {
        setShowListPackage(false);
        setListCommands((previewState: CommandI[]) => [...previewState, { str: `command list package error: "${_error}"`, status: CommandStatus.ERROR, date: new Date().toDateString() }]);
      },
      close => {
        setListCommands((previewState: CommandI[]) => [...previewState, { str: 'Close List Packages...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
      })
  }

  function openApp() {
    startAppCommand(packageActive, data => {
      setListCommands((previewState: CommandI[]) => [...previewState, { str: 'Command Start App...', status: CommandStatus.INFO, date: new Date().toDateString() }]); setListCommands((previewState: CommandI[]) => [...previewState, { str: 'Close Start App...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
    },
      _error => {
        setListCommands((previewState: CommandI[]) => [...previewState, { str: `Command start error: "${_error}"`, status: CommandStatus.ERROR, date: new Date().toDateString() }])
      }, close => {
        setListCommands((previewState: CommandI[]) => [...previewState, { str: 'Close Start App...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
      })
  }


  function closeApp() {
    stopAppCommand(packageActive, data => {
      setListCommands((previewState: CommandI[]) => [...previewState, { str: 'Command Close App...', status: CommandStatus.INFO, date: new Date().toDateString() }]); setListCommands((previewState: CommandI[]) => [...previewState, { str: 'Finish Close App...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
    },
      _error => {
        setListCommands((previewState: CommandI[]) => [...previewState, { str: `Command close error: "${_error}"`, status: CommandStatus.ERROR, date: new Date().toDateString() }])
      }, close => {
        setListCommands((previewState: CommandI[]) => [...previewState, { str: 'Finish close App...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
      })
  }

  function clearApp() {
    cleanCommand(packageActive, data => {

    },
      _error => {
        setListCommands((previewState: CommandI[]) => [...previewState, { str: `Command clear error: "${_error}"`, status: CommandStatus.ERROR, date: new Date().toDateString() }])
      }, close => {
        setListCommands((previewState: CommandI[]) => [...previewState, { str: 'Finish clear App...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
      })
  }

  function clearAndRestartApp() {
    cleanAndRestartCommand(packageActive, data => {

    },
      _error => {
        setListCommands((previewState: CommandI[]) => [...previewState, { str: `Command clear error: "${_error}"`, status: CommandStatus.ERROR, date: new Date().toDateString() }])
      }, close => {
        setListCommands((previewState: CommandI[]) => [...previewState, { str: 'Finish clear App...', status: CommandStatus.INFO, date: new Date().toDateString() }]);
      })
  }

  async function action(name: string) {
    switch (name) {
      case 'listPackets':
        await listThePackages();
        break;

      case 'startApp':
        await openApp()
        break;

      case 'stopApp':
        await closeApp();
        break;

      case 'clean':
        await clearApp();
        break;

      case 'cleanAndRestart':
        await clearAndRestartApp();
        break;
    }
  }



  return (
    <div className="App">
      <Drawer packageName={packageActive} packageActive={packageActive ? true : false} action={action} />
      <main className='flex-auto bg-slate-100 dark:bg-gray-800 h-screen  app-main overflow-scroll' >
        <Header onBack={() => { }} onChangeSearch={() => { }} title='Lista de comandos' />
        {showListPackage && listPackets.length > 0 && <ListPackages packages={listPackets} selectPackage={(str) => { setPackageActive(str); setShowListPackage(false) }} />}
        {!showListPackage && listCommands.length > 0 && <CommandList items={listCommands} selectItem={(str) => { }} />}

      </main>
    </div>
  )
}

export default App
