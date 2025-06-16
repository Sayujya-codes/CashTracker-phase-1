import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function Hero() {
  return (
    <section className="bg-gray-50 dark:bg-black/90 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        <Badge variant="outline" className="mb-4">
          💡 AI-Driven Finance Assistant
        </Badge>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
          Manage Your Money Smarter With <br />
          <span className="text-primary">CashTracker</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          Track your budget, spending, and savings — enhanced with AI insights,
          algorithmic predictions, and beautiful dashboards.
        </p>

        <div className="flex gap-4 mb-10 flex-wrap justify-center">
          <Link href="/dashboard">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/demo">
            <Button size="lg" variant="outline">
              Try Demo
            </Button>
          </Link>
        </div>

        {/* Scroll animation with banner image */}
        <div className="w-full mt-10">
          {/* <ContainerScroll
            titleComponent={
              <></> // Already have heading above
            }
          > */}
          {/* <Image
              src="/banner.jpeg"
              alt="AI Budgeting App Preview"
              width={1400}
              height={720}
              className="rounded-2xl mx-auto object-cover object-left-top shadow-xl"
              draggable={false}
            /> */}
          {/* </ContainerScroll> */}
        </div>
      </div>
    </section>
  );
}

export default Hero;
