import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlayIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { useCommands } from "@/context/commandsContexts";
import useTimer from "@/hooks/useTimer";
import { useConfigurationStore } from "@/store";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

const DialogRecordScreen = ({ isOpen, closeModal }: Props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [quality, setQuality] = useState(4000000);
  const [timeLimit, setTimeLimit] = useState(10);
  const { locationRecordScreens } = useConfigurationStore();
  const { time, stopTimer } = useTimer(isRecording);
  const { startRecordScreen, stopRecordScreen } = useCommands();

  function startToRecordScreen() {
    setIsRecording(true);
    startRecordScreen(
      locationRecordScreens,
      {
        quality,
        timeLimit,
      },
      () => {
        console.log("onData-RecordScreen");
        stopToRecordScreen();
      },
      () => {},
      () => {},
    );
  }

  function stopToRecordScreen() {
    setIsRecording(false);
    stopRecordScreen(
      () => {},
      () => {},
      () => {},
    );
    stopTimer();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  Record screen on the device
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-2">
                    If have custom activity on the package "
                    <span className="font-bold"></span>".You cant edit for
                    correty work of adb commands.
                  </p>
                </div>

                <div className="flex gap-3 my-2">
                  <div className="flex w-6/12 flex-col gap-3">
                    <label
                      htmlFor="quality"
                      className="text-sm font-medium text-gray-900"
                    >
                      Quality:
                    </label>
                    <select
                      onChange={(e) => setQuality(+e.target.value)}
                      id="quality"
                      className="block w-full py-2 px-3 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="4000000">High</option>
                      <option value="2000000">Medium</option>
                      <option value="1000000">Low</option>
                    </select>
                  </div>

                  <div className="flex w-6/12 flex-col gap-3">
                    <label
                      htmlFor="time"
                      className="text-sm font-medium text-gray-900"
                    >
                      Time:
                    </label>
                    <select
                      onChange={(e) => setTimeLimit(+e.target.value)}
                      id="time"
                      value={timeLimit}
                      className="block w-full py-2 px-3 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="10">10 Seconds</option>
                      <option value="20">20 Seconds</option>
                      <option value="30">30 Seconds</option>
                      <option value="60">1 Minute</option>
                      <option value="90">1 Minute 30 Sec.</option>
                      <option value="120">2 Minutes</option>
                      <option value="150">2 Minutes 30 Sec.</option>
                      <option value="190">3 Minutes</option>
                    </select>
                  </div>
                </div>

                <div className="flex w-full justify-start gap-3 mt-4">
                  <button
                    disabled={isRecording}
                    type="button"
                    className="flex w-6/12 justify-center gap-2 items-center rounded-md border border-gray-400  px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                    onClick={startToRecordScreen}
                  >
                    {isRecording ? (
                      <>
                        <p className="">Recording Screen</p>
                        <span>{time}</span>
                      </>
                    ) : (
                      <>
                        Start Record
                        <PlayIcon className=" w-6 h-6" />
                      </>
                    )}
                  </button>
                  <button
                    disabled={!isRecording}
                    type="button"
                    className={`flex w-6/12 justify-center gap-2 items-center rounded-md border border-red-300  px-4 py-2 text-sm font-medium text-red-500 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 disabled:opacity-30`}
                    onClick={stopToRecordScreen}
                  >
                    Cancel Recording
                    <XMarkIcon className=" w-6 h-6 " />
                  </button>
                </div>

                <div className="flex justify-end mt-4 w-full border-t border-gray-100 pt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-50  px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 mr-3"
                    onClick={closeModal}
                  >
                    Close
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

export default DialogRecordScreen;
function useEffect(arg0: () => void, arg1: boolean[]) {
  throw new Error("Function not implemented.");
}
