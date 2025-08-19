"use client";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { db } from "../../../../utils/dbconfig";
import { Budgets } from "../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);

  const checkUserBudgets = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

    if (result?.length === 0) {
      router.replace("/dashboard/budgets");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideNav isMobileOpen={isMobileOpen} toggleMobile={toggleMobile} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile toggle button */}
        <div className="md:hidden p-4 flex justify-end">
          <button
            className="text-2xl font-bold border p-2 rounded"
            onClick={toggleMobile}
          >
            ☰
          </button>
        </div>

        <DashboardHeader />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
