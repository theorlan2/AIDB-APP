import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//
import InputLocation from "./components/InputLocation";
import Header from "../../components/Layout/Header";
import { useCommands } from "../../context/commandsContexts";
import { openDialogSelectDirectory } from "../../utils/Dialogs";
import { useConfigurationStore } from "../../store";

const ConfigurationsScreen = () => {
  const navigate = useNavigate();
  const { setCommands } = useCommands();
  const configurationStore = useConfigurationStore();
  const [locaionPrintScreens, setLocaionPrintScreens] = useState("-");
  const [locaionRecordScreen, setLocaionRecordScreen] = useState("-");
  const [reversePortService, setReversePortService] = useState("8081");
  const [reversePortDevice, setReversePortDevice] = useState("8081");

  useEffect(() => {
    setLocaionPrintScreens(configurationStore.locationPrintScreens);
    setLocaionRecordScreen(configurationStore.locationRecordScreens);
    setReversePortService(configurationStore.portServiceReverse.toString());
    setReversePortDevice(configurationStore.portDeviceReverse.toString());
    () => {
      configurationStore.setPortServiceReverse(+reversePortService);
      configurationStore.setPortDeviceReverse(+reversePortDevice);
    };
  }, []);

  function clearCommands() {
    setCommands([]);
  }

  async function openDialogSelectDirectoryPrintScreens() {
    const dir = await openDialogSelectDirectory();
    if (typeof dir == "string") {
      setLocaionPrintScreens(dir);
      configurationStore.setLocationPrintScreens(dir);
    }
  }

  async function openDialogSelectDirectoryRecordScreens() {
    const dir = await openDialogSelectDirectory();
    if (typeof dir == "string") {
      setLocaionRecordScreen(dir);
      configurationStore.setLocationRecordScreens(dir);
    }
  }

  return (
    <div>
      <Header
        showClearAction={false}
        onClear={clearCommands}
        hiddenBack={false}
        onChangeSearch={() => {}}
        title="Configuration"
        onBack={() => navigate("/")}
      />
      <div className="flex flex-col px-2 ">
        <InputLocation
          title="Location to save Print Screens"
          locaion={locaionPrintScreens}
          openDialog={openDialogSelectDirectoryPrintScreens}
        />
        <InputLocation
          title="Location to save Record Screens"
          locaion={locaionRecordScreen}
          openDialog={openDialogSelectDirectoryRecordScreens}
        />
        <div className="flex flex-col">
          <h4 className=" text-gray-500 dark:text-white">Reverse Ports</h4>
          <div className="flex justify-between">
            <input
              onChange={(e) => setReversePortService(e.target.value)}
              value={reversePortService}
              className="px-2 py-1 mr-1 w-full rounded"
            />
            <input
              onChange={(e) => setReversePortDevice(e.target.value)}
              value={reversePortDevice}
              className="px-2 py-1 ml-1 w-full rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationsScreen;
