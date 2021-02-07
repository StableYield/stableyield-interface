import Link from "next/link";
import { Fragment } from "react";
import { useModal } from "react-modal-hook";
import { Modal } from "./Modal";
import { dashboard_menu_items } from "../../constants/menu";
/**
 * @name MobileMenu
 * @param {Object} props
 */
export const MobileMenu = ({ className, ...props }) => {
  // Modal : Component
  const [showModal, hideModal] = useModal(() => {
    return (
      <ModalMenuMobile hideModal={hideModal}>
        <MobileMenuItems />
      </ModalMenuMobile>
    );
  }, []);

  // Action : Component
  return (
    <img
      onClick={showModal}
      className={`cursor-pointer ${className}`}
      src="/icons/menu-color.svg"
      width={25}
    />
  );
};

/**
 * @name Modal
 * @param {Object} props
 */
export const ModalMenuMobile = ({ children, className, hideModal }) => {
  return (
    <>
      <div
        onClick={hideModal}
        className={
          "bg-black opacity-20 absolute top-0 bottom-0 left-0 right-0 z-10"
        }
      />
      <div
        className={`bg-white rounded-xl absolute top-10 bottom-10 left-10 right-10 p-8 z-20 shadow-lg overflow-auto`}
      >
        <div>
          <div className="bg-gray-100 flex justify-between p-4 -mt-8 -mx-8">
            <strong>Menu</strong>
            <span onClick={hideModal} className="cursor-pointer text-md">
              CLOSE
            </span>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

const MobileMenuItems = (props) => {
  return (
    <div className="overflow-auto max-h-full">
      {dashboard_menu_items.map((category, index) => (
        <Fragment key={index}>
          <Link href={category.url}>
            <a className={"flex items-center border-bottom pb-3 mt-3"}>
              <img
                className={"styles.categoryImage"}
                src={
                  category.image ||
                  "https://www.flaticon.com/svg/static/icons/svg/2592/2592204.svg"
                }
                width={24}
              />
              <h3 className={"text-md ml-2 "}>{category.label}</h3>
            </a>
          </Link>
          <ul className={"list"}>
            {category.children.map((item, cIndex) => (
              <MenuItem key={cIndex} {...item} />
            ))}
          </ul>
        </Fragment>
      ))}
    </div>
  );
};

const MenuItem = ({ label, url, disabled }) => {
  if (disabled) return <span sx={{ fontSize: 1 }}>{label}</span>;
  return (
    <li className={"styles.childItem"}>
      <Link href={url}>{label}</Link>
    </li>
  );
};

export default MobileMenu;
