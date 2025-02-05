import React from "react";
import { Route, Routes } from "react-router-dom";
//
import Layout from "./components/layout/Layout";
import CommandsListScreen from "./pages/commandsListScreen";
import PackageScreen from "./pages/packageScreen";
import ConfigurationsScreen from "./pages/configurationScreen";
import TutorialScreen from "./pages/tutorialScreen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TutorialScreen />} />
        <Route path="commands" element={<CommandsListScreen />} />
        <Route path="packages" element={<PackageScreen />} />
        <Route path="configuration" element={<ConfigurationsScreen />} />
      </Route>
    </Routes>
  );
}
