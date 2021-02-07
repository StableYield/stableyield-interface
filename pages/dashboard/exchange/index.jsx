import Link from "next/link";

import { FormCurveStableSwapAdvanced } from "../../../src/forms";

/**
 * @name
 * @param {Object} props
 */
export const ExchangePage = (props) => {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <span>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>{" "}
          &gt; <strong>Stablecoin Exchange</strong>
        </span>
        <Link href="/article/stableyield-vault">
          <a className="text-sm font-normal px-3 tag-white hover:shadow-md">
            Learn More
          </a>
        </Link>
      </div>
      <div className="h-full w-full flex flex-1 flex-col justify-center items-center ">
        <div className="max-w-screen-md w-full py-10">
          <FormCurveStableSwapAdvanced />
        </div>
      </div>
    </>
  );
};
export default ExchangePage;
