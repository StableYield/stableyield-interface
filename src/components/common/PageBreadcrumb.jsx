import Link from "next/link";

/**
 * @name PageBreadcrumb
 * @param {Object} props
 */
export const PageBreadcrumb = ({ path, learnMoreHref }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <span>
        <Link href="/dashboard">
          <a>Dashboard</a>
        </Link>{" "}
        &gt; <strong>{path}</strong>
      </span>
      <Link href={learnMoreHref}>
        <a className="text-sm font-normal px-3 tag-white hover:shadow-md">
          Learn More
        </a>
      </Link>
    </div>
  );
};

PageBreadcrumb.defaultProps = {
  path: "",
  learnMoreHref: "/dashboard",
};

export default PageBreadcrumb;
