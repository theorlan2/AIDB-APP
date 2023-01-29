import React from 'react'
import { Route, Routes } from "react-router-dom";
//
import Layout from "../components/Layout/Layout";
import CommandsListScreen from "../views/commandsListScreen";
import PackageScreen from "../views/packageScreen";
import ConfigurationsScreen from "../views/configurationScreen";
import TutorialScreen from '../views/tutorialScreen';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<TutorialScreen />} />
                <Route path='commands' element={<CommandsListScreen />} />
                <Route path="packages" element={<PackageScreen />} />
                <Route path="configuration" element={<ConfigurationsScreen />} />
            </Route>
        </Routes>
    )
}
