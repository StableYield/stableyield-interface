import Link from "next/link";

import { FormAaveCollateralBorrow } from "../../../src/forms";
import { AaveAssetBorrowedTable } from "../../../src/components";
import contracts from "../../../src/constants/contracts";

/**
 * @name BorrowPage
 */
const BorrowPage = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <span>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>{" "}
          &gt; <strong>Borrow</strong>
        </span>
        <Link href="/article/stableyield-vault">
          <a className="text-sm font-normal px-3 tag-white hover:shadow-md">
            Learn More
          </a>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className={"flex flex-5 flex-col h-full py-2"}>
          {/* <div className="card mt-4">
            <h3 className="text-xl font-bold border-bottom pb-2 mb-3">
              Account Data
            </h3>
            <AaveUserAccountData classNameContainer="flex-col" />
          </div> */}
          {/* <h3 className="text-4xl font-bold border-bottom pb-2 mb-5">Borrow</h3> */}
          <FormAaveCollateralBorrow />
          <div className="my-10">
            <AaveAssetBorrowedTable />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default BorrowPage;
