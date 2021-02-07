import Link from "next/link";
import { MakerVaultListAndCreate } from "../../../../src/views";

/**
 * @name VaultsPage
 */
const VaultsPage = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <span>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>{" "}
          &gt; <strong>Debt (Personal Stablecoin Loans) </strong>
        </span>
        <Link href="/article/stableyield-vault">
          <a className="text-sm font-normal px-3 tag-white hover:shadow-md">
            Learn More
          </a>
        </Link>
      </div>
      <div className="py-6">
        <MakerVaultListAndCreate />
      </div>
    </>
  );
};

export default VaultsPage;
