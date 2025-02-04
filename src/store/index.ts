import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  locationPrintScreens: string;
  locationRecordScreens: string;
  portServiceReverse: number;
  portDeviceReverse: number;
};

type Actions = {
  setLocationPrintScreens: (locationScreens: string) => void;
  setLocationRecordScreens: (locationRecordScreens: string) => void;
  setPortServiceReverse: (portService: number) => void;
  setPortDeviceReverse: (portDevice: number) => void;
};

export const useConfigurationStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      locationPrintScreens: "~",
      locationRecordScreens: "~",
      portServiceReverse: 8081,
      portDeviceReverse: 8081,
      setLocationPrintScreens: (locationScreens: string) =>
        set((state) => ({ locationPrintScreens: locationScreens })),
      setLocationRecordScreens: (locationRecordScreens: string) =>
        set((state) => ({ ...state, locationRecordScreens })),
      setPortServiceReverse: (portService: number) =>
        set((state) => ({ ...state, portServiceReverse: portService })),
      setPortDeviceReverse: (portDevice: number) =>
        set((state) => ({ ...state, portDeviceReverse: portDevice })),
    }),
    {
      name: "aidb-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
