import React, { FunctionComponent } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { writeText } from '@tauri-apps/api/clipboard';
//
import CodeBlock from './components/CodeBlock'

type Props = {}

const TutorialScreen: FunctionComponent<Props> = () => {
  return (
    <div className='px-2  w-full' >
      <div className="header flex items-center my-6">
        <div className="mr-2">
          <div className='flex border-2 w-16 h-16 rounded-full border-slate-400 dark:border-white  fill-slate-600 dark:fill-white p-2 opacity-80' >
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M740.648855 204.7936l-117.75632 0 0 117.75632 51.1984 0 0 81.91744c0 18.783413 0 30.71904-18.783413 49.502453l-117.75632 116.060373 0-476.14512 23.903253 39.262773 29.023093-17.055467-69.981813-116.060373-69.981813 116.060373 29.023093 17.055467 23.903253-39.262773 0 616.076748-107.51664-107.51664c-18.783413-18.783413-29.023093-34.142933-29.023093-46.07856l0-80.221493c29.023093-6.815787 51.1984-34.142933 51.1984-66.55792 0-37.534827-30.71904-68.253867-68.253867-68.253867s-68.253867 30.71904-68.253867 68.253867c0 32.414987 22.175307 58.014187 51.1984 66.55792l0 80.221493c0 29.023093 20.47936 52.894347 39.262773 69.981813l133.11584 133.11584 0 95.581013c-39.262773 8.543733-68.253867 42.654667-68.253867 83.613387 0 47.774507 37.534827 85.341333 85.341333 85.341333s85.341333-37.534827 85.341333-85.341333c0-40.95872-29.023093-75.101653-68.253867-83.613387l0-235.51264 141.659573-141.659573c29.023093-29.023093 29.023093-52.894347 29.023093-73.373707l0-81.91744 32.414987 0 0-117.75632zM315.702134 409.5872c0-18.783413 15.35952-34.142933 34.142933-34.142933s34.142933 15.35952 34.142933 34.142933c0 18.783413-15.35952 34.142933-34.142933 34.142933s-34.142933-15.35952-34.142933-34.142933zM571.694135 938.626668c0 29.023093-22.175307 51.1984-51.1984 51.1984s-51.1984-22.175307-51.1984-51.1984c0-29.023093 22.175307-51.1984 51.1984-51.1984s51.1984 22.175307 51.1984 51.1984zM657.003469 238.936533l49.502453 0 0 49.502453-49.502453 0 0-49.502453z" /></svg>
          </div>
        </div>
        <div className='flex flex-col text-slate-600 dark:text-white ' >
          <h4 className='font-medium' >AIDB</h4>
          <p className='text-sm ' >Use AIDB commands GUI, to facilitate the development of android and ios applications (React Native).</p>
        </div>
      </div>
      <div className="">
        <h5 className='text-md font-medium text-slate-600 dark:text-white my-2' >Requirements</h5>
        <p className='text-sm text-slate-600 dark:text-white mt-2 mb-6 break-words' >
          Need Android Debug Bridge (ADB) or Ios Debug Bridge(IDB) installed to get connection to android device.
        </p>
        <p className='text-sm text-slate-600 dark:text-white my-2' >
          To Install ADB see the instructions:
        </p>

        <div className="flex flex-col">
          <Disclosure as='div' className='my-2' >
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded  bg-white dark:bg-slate-100 px-4 py-2 text-left text-sm font-medium text-slate-900 hover:bg-slate-200 dark:hover:bg-white focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                  <span>MAC OS</span>
                  <ChevronUpIcon
                    className={`transition-transform duration-300 ${open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-slate-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className=" px-4 pt-4 pb-2 text-sm text-slate-600 dark:text-white">
                  <ul className='list-decimal' >
                    <li className='my-2' ><p>Install Homebrew</p></li>
                    <li className='my-2'>
                      <p>Install Android platform tools</p>
                      <CodeBlock content='brew install android-platform-tools' showBtnClipboard copyToClipboard={async (value) => await writeText(value)} />
                    </li>
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="my-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded  bg-white dark:bg-slate-100 px-4 py-2 text-left text-sm font-medium text-slate-900 hover:bg-slate-200 dark:hover:bg-white focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                  <span>Windows</span>
                  <ChevronUpIcon
                    className={`transition-transform duration-300 ${open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-slate-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-slate-600 dark:text-white">
                  <ul className='list-decimal' >
                    <li className='my-2'  >
                      <p className='text-slate-500 dark:text-white' >
                        <a className=' underline' href="https://dl.google.com/android/repository/platform-tools-latest-windows.zip">Download android platform tools</a>  and unzip it somewhere.
                      </p>
                    </li>
                    <li className='my-2'  >
                      <a className='underline' href="https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/" target={'_blank'}>Add the folder to your PATH.</a>
                    </li>
                    <li className='my-2'  >
                      <a href="https://developer.android.com/studio/run/oem-usb#Drivers">Install USB drivers for your device</a>
                    </li>
                    <li className='my-2'  >
                      <p className='text-slate-500 dark:text-white text-sm mb-1' >Check your device is detected:</p>
                      <CodeBlock content='adb devices' showBtnClipboard copyToClipboard={async (value) => await writeText(value)} />
                    </li>
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="my-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded  bg-white dark:bg-slate-100 px-4 py-2 text-left text-sm font-medium text-slate-900 hover:bg-slate-200 dark:hover:bg-white focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                  <span>Linux</span>
                  <ChevronUpIcon
                    className={`transition-transform duration-300 ${open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-slate-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-slate-600 dark:text-white">
                  <ul className='list-disc' >
                    <li className='my-2'  >  <p className='mb-1 text-sm'>Debian Base:</p>
                      <CodeBlock content='sudo apt install android-sdk-platform-tools' showBtnClipboard copyToClipboard={async (value) => await writeText(value)} />
                    </li>
                    <li className='my-2' ><p className='mb-1 text-sm'>Arch-Linux Base:</p>
                      <CodeBlock content='sudo pacman -S android-tools' showBtnClipboard copyToClipboard={async (value) => await writeText(value)} />
                    </li>
                    <li className='my-2' ><p className='mb-1 text-sm'>Red Hat Base:</p>
                      <CodeBlock content='sudo yum install android-tools' showBtnClipboard copyToClipboard={async (value) => await writeText(value)} />
                    </li>
                    <li className='my-2' ><p className='mb-1 text-sm'>OpenSUSE Base:</p>
                      <CodeBlock content='sudo zypper install android-tools' showBtnClipboard copyToClipboard={async (value) => await writeText(value)} />
                    </li>
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
        <p className='text-sm text-slate-600 dark:text-white my-2' >
          To Install IDB (Only Mac OS) see the instructions:
        </p>

        <div className="flex flex-col">
          <Disclosure as='div' className='my-2' >
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded  bg-white dark:bg-slate-100 px-4 py-2 text-left text-sm font-medium text-slate-900 hover:bg-slate-200 dark:hover:bg-white focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                  <span>MAC OS</span>
                  <ChevronUpIcon
                    className={`transition-transform duration-300 ${open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-slate-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className=" px-4 pt-4 pb-2 text-sm text-slate-600 dark:text-white">
                  <ul className='list-decimal' >
                    <li className='my-2' ><p className=''>Install Homebrew</p></li>
                    <li className='my-2'>
                      <p className='mb-1' >First Add Facebook’s tap so that Homebrew can find IDB.</p>
                      <CodeBlock content='brew tap facebook/fb' showBtnClipboard copyToClipboard={async (value) => await writeText(value)} />
                    </li>
                    <li className='my-2'>
                      <p className='mb-1' >Install IDB platform tools</p>
                      <CodeBlock content='brew install idb-companion' showBtnClipboard copyToClipboard={async (value) => await writeText(value)} />
                    </li>
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

      </div>
    </div>
  )
}

export default TutorialScreen