import classnames from "classnames";
import React, { Fragment, useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Popover } from "react-tiny-popover";

import { dashboard_menu_items } from "../../constants/menu";
import styles from "./DashboardSideMenu.module.css";

var getDirection = function (ev, obj) {
  var w = obj.offsetWidth,
    h = obj.offsetHeight,
    x = ev.pageX - obj.offsetLeft - (w / 2) * (w > h ? h / w : 1),
    y = ev.pageY - obj.offsetTop - (h / 2) * (h > w ? w / h : 1),
    d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;

  return d;
};

const PopoverComponent = dynamic(() => import("react-tiny-popover"), {
  ssr: false,
});

console.log(PopoverComponent, "Popover");

/**
 * DashboardSideMenu
 * @param props
 */
export const DashboardSideMenu = (props) => {
  return (
    <div className={"flex items-center grid grid-cols-9"}>
      {dashboard_menu_items.map((category, index) => (
        <MenuItem key={index} {...category} />
      ))}
    </div>
  );
};

const MenuItem = ({ label, href, image, disabled }) => {
  const router = useRouter();
  const [isPopoverOpen, isPopoverOpenSet] = useState(false);
  const isActive = useMemo(() => {
    return router.pathname === href ? true : false;
  }, [router.pathname]);

  const handleTogglePopover = () => isPopoverOpenSet(!isPopoverOpen);

  const handleMouseOutMenuItem = (event, object) => {
    // console.log(event, "event", object);
    // const direction = getDirection(event, object);
    // console.log(direction, "directiondirection");
  };

  const className = classnames(
    "menu-item flex justify-center items-center px-4 py-4 border-solid border-b-2 border-transparent hover:bg-gray-100 text-center",
    {
      "border-blue-300 bg-blue-500 text-white hover:bg-blue-600": isActive,
    }
  );
  if (disabled) return <span sx={{ fontSize: 1 }}>{label}</span>;

  return (
    <div>
      {process.browser && (
        <Popover
          isOpen={false}
          onClickOutside={() => isPopoverOpenSet(false)}
          positions={["bottom", "left", "right"]} // preferred positions by priority
          content={<PopoverMenu handleTogglePopover={handleTogglePopover} />}
        >
          <div
            onMouseOver={() => isPopoverOpenSet(true)}
            // onMouseOut={handleMouseOutMenuItem}
          >
            <Link href={href}>
              <a className={className}>
                {image && (
                  <img className={"svg-white"} src={image} width={15} />
                )}
                <h3
                  className={
                    "text blocktext-center hover:text-blue ml-1 text-center"
                  }
                >
                  {label}
                </h3>
              </a>
            </Link>
          </div>
        </Popover>
      )}
    </div>
  );
};

const PopoverMenu = ({ handleTogglePopover }) => {
  return (
    <div onMouseOut={handleTogglePopover} className="card p-10 w-60"></div>
  );
};
