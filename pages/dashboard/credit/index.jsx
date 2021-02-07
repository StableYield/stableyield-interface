import { CreditTabs } from "../../../src/views";

/**
 * @name CreditPage
 */
const CreditPage = () => {
  return (
    <>
      {/* <div className="flex items-center justify-between mb-3">
        <span>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>{" "}
          &gt; <strong>Credit Line(s) Management</strong>
        </span>
        <Link href="/article/stableyield-vault">
          <a className="text-sm font-normal px-3 tag-white hover:shadow-md">
            Learn More
          </a>
        </Link>
      </div> */}
      <div className={"flex flex-col h-full pb-10 -mt-4"}>
        <CreditTabs />
      </div>
    </>
  );
};

export default CreditPage;
