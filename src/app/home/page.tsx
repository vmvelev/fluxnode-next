"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Helmet } from "react-helmet";
import { useLayout } from "@/contexts/LayoutContext";
import { FaMedal } from "react-icons/fa";
import type { GlobalStore } from "@/types/flux";
import {
  createGlobalStore,
  validateAddress,
  fetchGlobalStats,
} from "../../lib/api";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import DashboardCells from "@/components/DashboardCells";

export default function HomePage() {
  const router = useRouter();
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [gstore, setGstore] = useState<GlobalStore>(createGlobalStore());
  const [isNodesLoading, setIsNodesLoading] = useState(false);
  const [totalDonations, setTotalDonations] = useState(0);
  const [addressInput, setAddressInput] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSearchHistory, setShowSearchHistory] = useState(false);

  const { enableDashboardCells } = useLayout();

  const handleAddressSubmit = async () => {
    if (!addressInputRef.current) return;

    const address = addressInputRef.current.value.trim();
    setIsNodesLoading(true);

    try {
      const isValid = await validateAddress(address);
      if (!isValid) {
        throw new Error("Invalid wallet address");
      }

      router.push(`/nodes?wallet=${address}`);
    } catch (error) {
      // Handle error - you might want to show a toast message here
      console.error(error);
    } finally {
      setIsNodesLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddressSubmit();
    }
  };

  const renderActiveAddressView = () => {
    const activeAddress = addressInputRef.current?.value;

    if (!activeAddress) return null;

    return (
      <div className="flex justify-between bg-white dark:bg-gray-800 p-2">
        <div className="flex gap-2">
          <span>Current Wallet Address</span>
          {/* {totalDonations > 0 && (
            <Tooltip2
              content={
                <div>
                  Total donations: <strong>{totalDonations}</strong>
                </div>
              }
              placement="bottom"
            >
              <span className="inline-flex items-center gap-1">
                <FaMedal color="gold" size={16} />
                {totalDonations}
              </span>
            </Tooltip2>
          )} */}
        </div>
        <a
          href={`https://explorer.runonflux.io/address/${activeAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600"
        >
          {activeAddress}
        </a>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Home | FluxNode</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="mb-8">
              <div className="form-group flex">
                <Input
                  ref={addressInputRef}
                  value={addressInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAddressInput(e.target.value)
                  }
                  onKeyPress={handleKeyPress}
                  placeholder="Enter Wallet Address"
                  className="rounded-r-none"
                />
                <Button
                  onClick={handleAddressSubmit}
                  disabled={isNodesLoading}
                  className="rounded-l-none"
                >
                  Search
                </Button>
              </div>
            </div>

            {renderActiveAddressView()}

            {enableDashboardCells && (
              <DashboardCells gstore={gstore} totalDonations={totalDonations} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
