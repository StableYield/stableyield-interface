import { FormSettingsTokenList } from "../../../src/forms";
import { PageBreadcrumb } from "../../../src/components";

/**
 * @name SettingsPage
 * @description Decentralized application settings page.
 */
const SettingsPage = () => {
  return (
    <>
      <PageBreadcrumb path="Settings" learnMoreHref="/article/settings" />
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-2xl mb-4">Token List</h3>
        <FormSettingsTokenList />
      </div>
    </>
  );
};

export default SettingsPage;
