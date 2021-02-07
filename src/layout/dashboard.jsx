import React from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import {
  MobileMenu,
  WalletEnableModal,
  DashboardSideMenu,
  SiteFooter,
} from "../components";

/**
 * @name DashboardLayout
 * @param {Object} props
 */
export const DashboardLayout = ({ children, ...props }) => {
  const isTabletOrMobile = useMediaQuery({
    query: "(max-width: 980px)",
  });

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen overflow-x-hidden">
      <div className={"dashboard-header"}>
        <div className={"flex items-center"}>
          <Link href="/">
            <a className="flex items-center text-gray-700 hover:text-gray-500">
              <img src="/icons/circle.svg" className="mr-3" width={32} />
              StableYield
            </a>
          </Link>
          {!isTabletOrMobile && (
            <>
              <Link href="/article/buy-cryptocurrency">
                <a className="tag-green ml-3 cursor-pointer self-center">
                  Buy Cryptocurrency
                </a>
              </Link>
              <Link href="/dashboard/secret-wallet">
                <a className="tag-indigo">Start Secret Wallet</a>
              </Link>
            </>
          )}
        </div>
        <div className={"flex items-center"}>
          {!isTabletOrMobile ? (
            <>
              <WalletEnableModal />
              <Link href="/dashboard">
                <button className="btn-indigo btn-sm ml-3">Dashboard</button>
              </Link>
            </>
          ) : (
            <MobileMenu />
          )}
        </div>
      </div>
      {!isTabletOrMobile && (
        <div
          className={
            "bg-white shadow-sms border-bottoms text-gray-600 w-full mb-4"
          }
        >
          <div
            className={
              "flex items-center justify-between bg-blue max-w-screen-xl w-full mx-auto px-8"
            }
          >
            <DashboardSideMenu />
            {/* <Link href="/dashboard/secret-wallet">
              <a className="tag-green">Start Secret Wallet</a>
            </Link> */}
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col h-full max-w-screen-xl w-full mx-auto px-8">
        {children}
      </div>
      <SiteFooter />
    </div>
  );
};

export default DashboardLayout;
