// src/components/DashboardCells.tsx
"use client";

import { useLayout } from "@/contexts/LayoutContext";
import {
  FiZap,
  FiCpu,
  FiPackage,
  FiHardDrive,
  FiHash,
  FiDollarSign,
} from "react-icons/fi";
import { FaWallet, FaEuroSign } from "react-icons/fa";
import type { GlobalStore } from "@/types/flux";
import { calculateFloatNumber } from "@/lib/utils";
import { Card } from "./ui/Card";
import { CircularProgress } from "./ui/CircularProgress";

interface UtilizationTooltipProps {
  utilized: number;
  total: number;
  suffix?: string;
}

interface DashboardCellProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  suffix?: string;
  tooltip?: React.ReactNode;
  isProgressCell?: boolean;
  progressValue?: number;
  progressColor?: string;
  className?: string;
}

const UtilizationTooltip = ({
  utilized,
  total,
  suffix = "",
}: UtilizationTooltipProps) => {
  const displayUtilized = `${calculateFloatNumber(utilized)} ${suffix}`;
  const displayTotal = total
    ? `${calculateFloatNumber(total)} ${suffix}`
    : "Not Available";

  return (
    <div className="p-2">
      <div className="mb-1">
        <span className="font-medium text-gray-400">Utilized: </span>
        <span className="text-white">{displayUtilized}</span>
      </div>
      <div>
        <span className="font-medium text-gray-400">Total: </span>
        <span className="text-white">{displayTotal}</span>
      </div>
    </div>
  );
};

const DashboardCell = ({
  title,
  value,
  icon,
  suffix = "",
  tooltip,
  isProgressCell,
  progressValue = 0,
  progressColor = "#38ef7d",
  className = "",
}: DashboardCellProps) => {
  return (
    <Card className={`relative p-4 ${className}`}>
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <div className="flex items-center">
            {isProgressCell ? (
              <CircularProgress
                value={progressValue}
                color={progressColor}
                size={60}
              />
            ) : (
              <p className="text-2xl font-semibold">
                {value}
                {suffix && <span className="ml-1 text-sm">{suffix}</span>}
              </p>
            )}
          </div>
        </div>
      </div>
      {tooltip && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
          {tooltip}
        </div>
      )}
    </Card>
  );
};

interface DashboardCellsProps {
  gstore: GlobalStore;
  totalDonations: number;
}

export default function DashboardCells({
  gstore: gs,
  totalDonations,
}: DashboardCellsProps) {
  const { selectedCurrency } = useLayout();
  const isCurrencyEUR = selectedCurrency.currency === "EUR";

  const currencyIcon = isCurrencyEUR ? (
    <FaEuroSign size={24} />
  ) : (
    <FiDollarSign size={24} />
  );
  const currencyPrefix = isCurrencyEUR ? "€" : "$";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <DashboardCell
        title={`Flux ${selectedCurrency.currency} Value`}
        value={gs.flux_price_usd * selectedCurrency.rate}
        icon={currencyIcon}
        className="bg-emerald-50 dark:bg-emerald-900/20"
        suffix={currencyPrefix}
      />

      <DashboardCell
        title="Total Nodes"
        value={gs.node_count.total}
        icon={<FiHash size={24} />}
        className="bg-purple-50 dark:bg-purple-900/20"
      />

      <DashboardCell
        title="Cumulus Nodes"
        value={gs.node_count.cumulus}
        icon={<FiZap size={24} />}
        className="bg-blue-50 dark:bg-blue-900/20"
      />

      <DashboardCell
        title="Nimbus Nodes"
        value={gs.node_count.nimbus}
        icon={<FiCpu size={24} />}
        className="bg-orange-50 dark:bg-orange-900/20"
      />

      <DashboardCell
        title="Stratus Nodes"
        value={gs.node_count.stratus}
        icon={<FiPackage size={24} />}
        className="bg-red-50 dark:bg-red-900/20"
      />

      <DashboardCell
        title="Fractus Nodes"
        value={gs.node_count.fractus}
        icon={<FiHardDrive size={24} />}
        className="bg-green-50 dark:bg-green-900/20"
      />

      {/* Utilization Cells */}
      <DashboardCell
        title="Node Utilization"
        value={gs.utilized.nodes_percentage}
        icon={<FiZap size={24} />}
        suffix="%"
        isProgressCell
        progressValue={gs.utilized.nodes_percentage}
        progressColor="#ff4d94"
        tooltip={
          <UtilizationTooltip
            utilized={gs.utilized.nodes}
            total={gs.node_count.total}
          />
        }
      />

      <DashboardCell
        title="CPU Utilization"
        value={gs.utilized.cores_percentage}
        icon={<FiCpu size={24} />}
        suffix="%"
        isProgressCell
        progressValue={gs.utilized.cores_percentage}
        progressColor="#38ef7d"
        tooltip={
          <UtilizationTooltip
            utilized={gs.utilized.cores}
            total={gs.total.cores}
            suffix="vCores"
          />
        }
      />

      <DashboardCell
        title="RAM Utilization"
        value={gs.utilized.ram_percentage}
        icon={<FiPackage size={24} />}
        suffix="%"
        isProgressCell
        progressValue={gs.utilized.ram_percentage}
        progressColor="#8E2DE2"
        tooltip={
          <UtilizationTooltip
            utilized={gs.utilized.ram}
            total={gs.total.ram}
            suffix="TB"
          />
        }
      />

      <DashboardCell
        title="SSD Utilization"
        value={gs.utilized.ssd_percentage}
        icon={<FiHardDrive size={24} />}
        suffix="%"
        isProgressCell
        progressValue={gs.utilized.ssd_percentage}
        progressColor="#36D1DC"
        tooltip={
          <UtilizationTooltip
            utilized={gs.utilized.ssd}
            total={gs.total.ssd}
            suffix="TB"
          />
        }
      />
    </div>
  );
}
