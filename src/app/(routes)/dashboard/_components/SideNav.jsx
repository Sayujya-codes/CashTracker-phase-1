import React, { useEffect } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav({ isMobileOpen, toggleMobile }) {
  const menuList = [
    { id: 1, name: "Dashboard", path: "/dashboard" },
    { id: 2, name: "Incomes", path: "/dashboard/incomes" },
    { id: 3, name: "Budgets", path: "/dashboard/budgets" },
    { id: 4, name: "Expenses", path: "/dashboard/expenses" },
    { id: 5, name: "Upgrade", path: "/dashboard/upgrade" },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="h-screen p-5 border shadow-sm hidden md:block">
        <div className="flex flex-row items-center">
          <Image src={"/logo.png"} alt="logo" width={150} height={25} />
        </div>

        <div className="mt-5">
          {menuList.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <h2
                className={`text-gray-500 font-medium mb-2 p-4 cursor-pointer rounded-xl
                          hover:text-primary 
                          ${path === menu.path ? "text-primary bg-gray-100" : ""}`}
              >
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>

        <div className="fixed bottom-10 p-5 flex gap-2 items-center">
          <UserButton />
          <span>Profile</span>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex">
          <div className="w-64 bg-white p-5 shadow-lg">
            <div className="flex flex-row items-center mb-5">
              <Image src={"/logo.png"} alt="logo" width={150} height={25} />
              <button
                className="ml-auto text-xl font-bold"
                onClick={toggleMobile}
              >
                ✕ 
              </button>
            </div>

            <div className="mt-5">
              {menuList.map((menu, index) => (
                <Link href={menu.path} key={index} onClick={toggleMobile}>
                  <h2
                    className={`text-gray-500 font-medium mb-2 p-4 cursor-pointer rounded-full
                              hover:text-primary hover:bg-gray-100
                              ${path === menu.path ? "text-primary bg-gray-100" : ""}`}
                  >
                    {menu.name}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex-1" onClick={toggleMobile}></div>
        </div>
      )}
    </>
  );
}

export default SideNav;
