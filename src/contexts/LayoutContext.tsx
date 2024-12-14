"use client";

import { createContext, useContext, useState } from "react";

interface LayoutContextType {
  enableParallelAssetsTab: boolean;
  enableEstimatedEarningsTab: boolean;
  enableDashboardCells: boolean;
  normalFontSize: boolean;
  enablePrivacyMode: boolean;
  enableNotableNodesTab: boolean;
  selectedCurrency: {
    currency: string;
    rate: number;
  };
  setEnableEstimatedEarningsTab: (value: boolean) => void;
  setEnableParallelAssetsTab: (value: boolean) => void;
  setEnableDashboardCells: (value: boolean) => void;
  setNormalFontSize: (value: boolean) => void;
  setEnablePrivacyMode: (value: boolean) => void;
  setEnableNotableNodesTab: (value: boolean) => void;
  setSelectedCurrency: (value: { currency: string; rate: number }) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [enableEstimatedEarningsTab, setEnableEstimatedEarningsTab] =
    useState(true);
  const [enableParallelAssetsTab, setEnableParallelAssetsTab] = useState(true);
  const [enableDashboardCells, setEnableDashboardCells] = useState(true);
  const [normalFontSize, setNormalFontSize] = useState(true);
  const [enablePrivacyMode, setEnablePrivacyMode] = useState(false);
  const [enableNotableNodesTab, setEnableNotableNodesTab] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState({
    currency: "USD",
    rate: 1,
  });

  return (
    <LayoutContext.Provider
      value={{
        enableEstimatedEarningsTab,
        setEnableEstimatedEarningsTab,
        enableParallelAssetsTab,
        enableDashboardCells,
        normalFontSize,
        enablePrivacyMode,
        enableNotableNodesTab,
        selectedCurrency,
        setEnableParallelAssetsTab,
        setEnableDashboardCells,
        setNormalFontSize,
        setEnablePrivacyMode,
        setEnableNotableNodesTab,
        setSelectedCurrency,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
