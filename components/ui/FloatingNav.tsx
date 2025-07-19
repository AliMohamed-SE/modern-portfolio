"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          // change rounded-full to rounded-lg
          // remove dark:border-white/[0.2] dark:bg-black bg-white border-transparent
          // change  pr-2 pl-8 py-2 to px-10 py-5
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 md:inset-x-0 inset-x-4 mx-auto px-10 py-3 rounded-full border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        {navItems.slice(0, 2).map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex md:space-x-1 space-x-0.5 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 transition-all"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="md:text-sm text-xs !cursor-pointer">
              {navItem.name}
            </span>
          </Link>
        ))}
        <Link
          href="#hero"
          className="flex flex-row justify-center items-center gap-2 group"
        >
          <div className="rounded-full bg-white w-1 h-1" />
          <div
            className={`relative rounded-full w-10 h-10 overflow-hidden group-hover:bg-white transition-bg duration-300`}
          >
            <Image
              src={`/logo-personal.svg`}
              alt="Logo Hover"
              fill
              className="transition-opacity duration-300 group-hover:opacity-0"
            />
            <Image
              src={`/logo-personal-transparent.svg`}
              alt="Logo"
              fill
              className="transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            />
          </div>
          <div className="rounded-full bg-white w-1 h-1" />
        </Link>
        {navItems.slice(2, 4).map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex md:space-x-1 space-x-0.5 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 transition-all"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="md:text-sm text-xs !cursor-pointer">
              {navItem.name}
            </span>
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
