"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useLayout } from "@/contexts/LayoutContext";
import { Select } from "./ui/Select";
import { Switch } from "./ui/Switch";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isSettingMenuOpen, setSettingMenuOpen] = useState(false);

  const {
    enableEstimatedEarningsTab,
    enableParallelAssetsTab,
    normalFontSize,
    enablePrivacyMode,
    enableDashboardCells,
    enableNotableNodesTab,
    selectedCurrency,
    setEnableEstimatedEarningsTab,
    setEnableParallelAssetsTab,
    setNormalFontSize,
    setEnablePrivacyMode,
    setEnableDashboardCells,
    setEnableNotableNodesTab,
    setSelectedCurrency,
  } = useLayout();

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <img
                src={theme === "dark" ? "/app-logo-dark.svg" : "/app-logo.svg"}
                alt="FluxNode"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/home"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/home"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Home
            </Link>
            <Link
              href="/nodes"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/nodes"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Nodes
            </Link>
            <Link
              href="/guide"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/guide"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Guides
            </Link>
            <Link
              href="/demo"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/demo"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Demo
            </Link>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {theme === "dark" ? (
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setSettingMenuOpen(!isSettingMenuOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {isSettingMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Switch
                      label="Estimated Earnings"
                      checked={enableEstimatedEarningsTab}
                      onCheckedChange={setEnableEstimatedEarningsTab}
                    />
                    <Switch
                      label="Parallel Assets"
                      checked={enableParallelAssetsTab}
                      onCheckedChange={setEnableParallelAssetsTab}
                    />
                    <Switch
                      label={`Font Size: ${
                        normalFontSize ? "Normal" : "Small"
                      }`}
                      checked={normalFontSize}
                      onCheckedChange={setNormalFontSize}
                    />
                    <Switch
                      label="Privacy Mode"
                      checked={enablePrivacyMode}
                      onCheckedChange={setEnablePrivacyMode}
                    />
                    <Switch
                      label="Dashboard Cells"
                      checked={enableDashboardCells}
                      onCheckedChange={setEnableDashboardCells}
                    />
                    <Switch
                      label="Notable Nodes"
                      checked={enableNotableNodesTab}
                      onCheckedChange={setEnableNotableNodesTab}
                    />
                    <Select
                      value={selectedCurrency.currency}
                      onValueChange={(value) =>
                        setSelectedCurrency({
                          currency: value,
                          rate: selectedCurrency.rate,
                        })
                      }
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
