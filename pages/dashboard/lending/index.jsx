import Link from "next/link";
import { AaveAssetsTable, WalletBalance } from "../../../src/components";
import { PurchaseEthOrGenerateStablecoin } from "../../../src/views";

/**
 * @name LendingPage
 */
const LendingPage = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <span>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>{" "}
          &gt; <strong>Lending</strong>
        </span>
        <Link href="/article/stableyield-vault">
          <a className="text-sm font-normal px-3 tag-white hover:shadow-md">
            Learn More
          </a>
        </Link>
      </div>
      <div className={"flex flex-col h-full pb-10"}>
        <PurchaseEthOrGenerateStablecoin />
        <div className="mt-6">
          <AaveAssetsTable />
        </div>
      </div>
    </>
  );
};

export default LendingPage;
