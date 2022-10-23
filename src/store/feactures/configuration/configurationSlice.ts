import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

type ConfigurationState = {
    locationPrintScreens: string;
    locationRecordScreens: string;
    portServiceReverse: number;
    portDeviceReverse: number;
};

const initialState: ConfigurationState = {
    locationPrintScreens: '~',
    locationRecordScreens: '~',
    portServiceReverse: 8081,
    portDeviceReverse: 8081
}


export const configurationSlice = createSlice({
    name: 'configuration',
    initialState,
    reducers: {
        setLocationPrintScreens: (state, action: PayloadAction<string>) => {
            state.locationPrintScreens = action.payload;
        },
        setLocationRecordScreens: (state, action: PayloadAction<string>) => {
            state.locationRecordScreens = action.payload;
        },
        setPortServiceReverse: (state, action: PayloadAction<number>) => {
            state.portServiceReverse = action.payload;
        },
        setPortDeviceReverse: (state, action: PayloadAction<number>) => {
            state.portDeviceReverse = action.payload;
        }
    }
});

export const {
    setLocationPrintScreens,
    setLocationRecordScreens,
    setPortServiceReverse,
    setPortDeviceReverse
} = configurationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
const configurationSelector = (state: RootState) => state.configuration;
export const selectConfigurations = createSelector(configurationSelector, configuration => configuration);

export default configurationSlice.reducer;