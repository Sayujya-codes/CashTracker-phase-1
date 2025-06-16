import React, { useEffect } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav() {
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
    <div className="h-screen p-5 border shadow-sm">
      <div className="flex flex-row items-center">
        <Image src={"/logo.png"} alt="logo" width={150} height={25} />
      </div>

      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2
              className={`text-gray-500 font-medium mb-2 p-4 cursor-pointer rounded-full
                          hover:text-primary hover:bg-gray-100
                          ${
                            path === menu.path ? "text-primary bg-gray-100" : ""
                          }
              `}
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
  );
}

export default SideNav;
