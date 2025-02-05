import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
//
import { useCommands } from "@/context/commandsContexts";
import { useConfigurationStore } from "@/store/index";
//
import DialogAlertRemove from "../dialogs/DialogAlertRemove";
import DialogEditActiviy from "../dialogs/DialogEditActiviy";
import DialogRecordScreen from "../dialogs/DialogRecordScreen";
import DialogLoading from "../dialogs/DialogLoading";
import Drawer from "./Drawer";

const Layout = () => {
  const navigate = useNavigate();
  const { locationPrintScreens } = useConfigurationStore();
  const { portServiceReverse, portDeviceReverse } = useConfigurationStore();
  const [showDialogAlertRemove, setShowDialogAlertRemove] = useState(false);
  const [showDialogEditActivty, setShowDialogChangeActivty] = useState(false);
  const [showDialogRecordScreen, setShowDialogRecordScreen] = useState(false);
  const {
    packageActive,
    packageMainActivity,
    devices,
    isLoadingCommand,
    openApp,
    closeApp,
    clearApp,
    clearAndRestartApp,
    getTheListDevices,
    setPackageActive,
    setPackageMainActivity,
    openShellAdb,
    setDeviceActive,
    reverseConnectionAdb,
    removeTheApp,
    screenCapture,
    startRecordScreen,
    stopRecordScreen,
  } = useCommands();

  async function action(name: string, value?: string) {
    switch (name) {
      case "listPackets":
        navigate("/packages");
        break;
      case "backToList":
        setPackageActive("");
        navigate("/packages");
        break;

      case "startApp":
        openApp();
        break;

      case "stopApp":
        closeApp();
        break;

      case "clean":
        clearApp();
        break;

      case "cleanAndRestart":
        clearAndRestartApp();
        break;

      case "openConfiguration":
        navigate("configuration");
        break;

      case "getTheListDevices":
        getTheListDevices();
        break;
      case "setDeviceActive":
        let device = devices.find((item) => item.id === value);
        if (device) {
          setDeviceActive(device);
        }
        break;
      case "openShellAdb":
        openShellAdb();
        break;
      case "reverseConnectionAdb":
        reverseConnectionAdb(portServiceReverse, portDeviceReverse);
        break;
      case "removeTheApp":
        setShowDialogAlertRemove(true);
        break;
      case "changeActivity":
        setShowDialogChangeActivty(true);
        break;
      case "screenRecord":
        setShowDialogRecordScreen(true);
        break;
      case "screenCapture":
        screenCapture(locationPrintScreens, () => {});
        break;
    }
  }

  return (
    <div className="App">
      <Drawer
        devices={devices}
        packageName={packageActive}
        packageActive={packageActive ? true : false}
        action={action}
      />
      <main className="flex-auto bg-slate-100 dark:bg-gray-800 h-screen  app-main overflow-auto">
        <Outlet />
        <DialogAlertRemove
          isOpen={showDialogAlertRemove}
          packageName={packageActive}
          onAccept={() => {
            removeTheApp(packageActive, () => {
              action("backToList");
            });
            setShowDialogAlertRemove(false);
          }}
          closeModal={() => {
            setShowDialogAlertRemove(false);
          }}
        />
        <DialogLoading
          isOpen={isLoadingCommand}
          title={"Loading command"}
          description={
            "Loading command data. This process may take a few seconds..."
          }
        />
        <DialogEditActiviy
          isOpen={showDialogEditActivty}
          onAccept={(name) => {
            setPackageMainActivity(name);
            setShowDialogChangeActivty(false);
          }}
          packageName={packageActive}
          activityName={packageMainActivity}
          closeModal={() => setShowDialogChangeActivty(false)}
        />
        <DialogRecordScreen
          isOpen={showDialogRecordScreen}
          closeModal={() => setShowDialogRecordScreen(false)}
        />
      </main>
    </div>
  );
};

export default Layout;
