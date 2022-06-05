import { BrowserRouter, Route, Routes } from "react-router-dom";

import React from 'react'
import Layout from "../components/Layout/Layout";
import CommandsScreen from "../views/CommandsScreen";
import PackageScreen from "../views/PackageScreen";

export default function App() {
    return (
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<CommandsScreen />} />
                    <Route path="packages" element={<PackageScreen />} />
                </Route>
            </Routes>
    )
}
