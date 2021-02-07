import React from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { MobileMenu, WalletEnableModal, SiteFooter } from "../components";

/**
 * @name SiteLayout
 * @param {Object} props
 */
export const SiteLayout = ({ children, ...props }) => {
  const isTabletOrMobile = useMediaQuery({
    query: "(max-width: 980px)",
  });

  return (
    <div className="flex flex-col h-screen overflow-x-hidden min-h-full">
      <div className={"dashboard-header"}>
        <div className={"flex items-center"}>
          <Link href="/">
            <a className="flex items-center text-gray-700 hover:text-gray-500">
              <img src="/icons/circle.svg" className="mr-3" width={32} />
              StableYield
            </a>
          </Link>
          {!isTabletOrMobile && (
            <Link href="/article/buy-cryptocurrency">
              <a className="tag-green ml-3 cursor-pointer self-center">
                Buy Cryptocurrency
              </a>
            </Link>
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
      <div>{children}</div>
      <SiteFooter />
    </div>
  );
};

export default SiteLayout;
