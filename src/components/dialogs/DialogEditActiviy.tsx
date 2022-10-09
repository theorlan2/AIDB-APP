import React, { Fragment, FunctionComponent, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  isOpen: boolean;
  packageName: string;
  activityName: string;
  closeModal: () => void;
  onAccept: (activityName: string) => void;
};

const DialogEditActiviy: FunctionComponent<Props> = (props) => {
  const [name, setName] = useState("MainActivity");

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit the Main Activity
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-2">
                    If have custom activity on the package "
                    <span className="font-bold">{props.packageName}</span>".You
                    cant edit for correty work of adb commands.
                  </p>
                  <input
                    value={name}
                    placeholder="Ex. CustomActivity"
                    onChange={(e) => setName(e.target.value)}
                    className="px-2 py-1 w-full rounded"
                  />
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 mr-3"
                    onClick={props.closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={() => props.onAccept(name)}
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogEditActiviy;
